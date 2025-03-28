import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo principal de la aplicación.
 * 
 * Este módulo configura e importa los módulos necesarios para la aplicación, 
 * incluyendo la configuración de variables de entorno, la conexión a la base 
 * de datos utilizando TypeORM, y los módulos específicos de la aplicación 
 * como `ArticleModule` y `AuthModule`.
 * 
 * @module AppModule
 * 
 * @description
 * - `ConfigModule`: Se utiliza para cargar y gestionar las variables de entorno.
 * - `TypeOrmModule.forRootAsync`: Configura la conexión a la base de datos MySQL 
 *   de forma asíncrona, utilizando las variables de entorno proporcionadas por 
 *   `ConfigService`.
 * - `ArticleModule`: Módulo relacionado con la gestión de artículos.
 * - `AuthModule`: Módulo relacionado con la autenticación de usuarios.
 * 
 * @example
 * ```typescript
 * import { AppModule } from './app.module';
 * ```
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ArticleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
