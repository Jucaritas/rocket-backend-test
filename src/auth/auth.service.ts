import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

/**
 * Servicio de autenticación que maneja la creación de usuarios, inicio de sesión y generación de tokens JWT.
 */
@Injectable()
export class AuthService {
  
  /**
   * Constructor del servicio de autenticación.
   * 
   * @param userRepository Repositorio de usuarios para interactuar con la base de datos.
   * @param jwtService Servicio para la generación y verificación de tokens JWT.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  /**
   * Crea un nuevo usuario en la base de datos y genera un token JWT para el usuario.
   * 
   * @param createUserDto Objeto con los datos necesarios para crear un usuario.
   * @returns Un objeto que contiene el usuario creado y un token JWT.
   * @throws BadRequestException Si ocurre un error relacionado con la base de datos.
   * @throws InternalServerErrorException Si ocurre un error inesperado.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password,10)
      });
      await this.userRepository.save(user);

      return {
        user: user,
        token: this.getJwtToken({email: user.email, fullName: user.fullName, roles: user.roles })
      }
    } catch (error) {      
      this.handleDBError(error);
    }
  }

  /**
   * Inicia sesión de un usuario verificando sus credenciales y genera un token JWT.
   * 
   * @param loginUserDto Objeto con las credenciales del usuario (email y contraseña).
   * @returns Un objeto que contiene los datos del usuario y un token JWT.
   * @throws UnauthorizedException Si las credenciales no son válidas.
   * @throws BadRequestException Si ocurre un error relacionado con la base de datos.
   * @throws InternalServerErrorException Si ocurre un error inesperado.
   */
  async loginUser(loginUserDto: LoginUserDto){
    console.log('User Logged: ',loginUserDto.email)
    try {      
      const user = await this.userRepository.findOne({ 
        where: { email: loginUserDto.email },
        select: { id: true, email: true, password: true, fullName: true, roles: true, isActive: true }
      });      
      
      if(!user)
        throw new UnauthorizedException('Credentials are not valid (email)');
      
      const { id, password, ...datos } = user;

      if(!bcrypt.compareSync(loginUserDto.password, user.password) )
        throw new UnauthorizedException('Credentials are not valid (password)');
      
      return {
        user: datos,
        token: this.getJwtToken({email: user.email, fullName: user.fullName, roles: user.roles })
      }
    } catch (error) {
      console.log("🚀 ~ AuthService ~ loginUser ~ error:", error)
      this.handleDBError(error);
    }
  }

  /**
   * Genera un token JWT basado en el payload proporcionado.
   * 
   * @param payload Objeto que contiene la información que se incluirá en el token JWT.
   * @returns Un token JWT como string.
   */
  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  /**
   * Maneja errores relacionados con la base de datos y lanza excepciones específicas.
   * 
   * @param error Objeto de error capturado.
   * @throws BadRequestException Si hay un conflicto de datos (por ejemplo, email duplicado).
   * @throws UnauthorizedException Si el error está relacionado con credenciales no válidas.
   * @throws InternalServerErrorException Para errores inesperados.
   */
  private handleDBError(error:any){
  
    if(error.errno && error.errno == 1062)
      throw new BadRequestException('There are an user with the same email');
    
    if(error.status && error.status == 401)
      throw new UnauthorizedException(error.message);

    if(error.code == '23505')
      throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('check logs');
  }

}
