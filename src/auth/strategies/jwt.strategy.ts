import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Estrategia JWT para la autenticación de usuarios.
 * 
 * Esta clase extiende la estrategia Passport para manejar la autenticación
 * basada en tokens JWT. Valida el token y verifica que el usuario asociado
 * esté activo.
 * 
 * @class JwtStrategy
 * @extends {PassportStrategy}
 * 
 * @constructor
 * @param {Repository<User>} userRepository - Repositorio de usuarios para realizar consultas en la base de datos.
 * @param {ConfigService} configService - Servicio de configuración para obtener valores como la clave secreta del JWT.
 * 
 * @method validate
 * Valida el token JWT y verifica que el usuario exista y esté activo.
 * 
 * @param {JwtPayload} payload - Contiene los datos decodificados del token JWT, como el correo electrónico del usuario.
 * @returns {Promise<User>} Retorna el usuario autenticado si la validación es exitosa.
 * @throws {UnauthorizedException} Si el token no es válido o el usuario no está activo.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate( payload: JwtPayload ): Promise<User> {
        
        const { email } = payload;

        const user = await this.userRepository.findOneBy({ email });

        if ( !user ) 
            throw new UnauthorizedException('Token not valid')
            
        if ( !user.isActive ) 
            throw new UnauthorizedException('User is inactive, talk with an admin');
        

        return user;
    }

}
