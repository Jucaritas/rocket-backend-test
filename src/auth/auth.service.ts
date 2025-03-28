import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}

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

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

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
