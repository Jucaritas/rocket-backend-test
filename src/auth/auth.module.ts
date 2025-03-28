import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * Módulo de autenticación que configura y proporciona los servicios necesarios
 * para la autenticación de usuarios en la aplicación.
 * 
 * Este módulo incluye:
 * - Integración con TypeORM para la entidad `User`.
 * - Configuración del módulo `ConfigModule` para manejar variables de entorno.
 * - Configuración del módulo `PassportModule` con la estrategia predeterminada `jwt`.
 * - Configuración del módulo `JwtModule` para la generación y validación de tokens JWT.
 * 
 * Exporta:
 * - `TypeOrmModule`: Para permitir el acceso a la entidad `User` desde otros módulos.
 * - `JwtStrategy`: Estrategia de autenticación basada en JWT.
 * - `PassportModule` y `JwtModule`: Para su uso en otros módulos.
 * 
 * Controladores:
 * - `AuthController`: Maneja las solicitudes relacionadas con la autenticación.
 * 
 * Proveedores:
 * - `AuthService`: Servicio que contiene la lógica de autenticación.
 * - `JwtStrategy`: Estrategia para validar tokens JWT.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'30m'
          }
        }
      }
    }),
  ],
  exports: [TypeOrmModule,JwtStrategy,PassportModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
