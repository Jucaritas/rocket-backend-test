import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

/**
 * El `ArticleModule` es un módulo de características en la aplicación que encapsula
 * toda la funcionalidad relacionada con los artículos. Importa los módulos necesarios,
 * define controladores y proporciona servicios para manejar operaciones relacionadas con artículos.
 *
 * @module ArticleModule
 *
 * @description
 * - Importaciones:
 *   - `TypeOrmModule.forFeature([Article])`: Registra la entidad `Article` con TypeORM para operaciones de base de datos.
 *   - `AuthModule`: Maneja la funcionalidad relacionada con la autenticación.
 *   - `PassportModule`: Configura Passport.js con la estrategia predeterminada establecida en 'jwt'.
 * - Controladores:
 *   - `ArticleController`: Maneja las solicitudes HTTP entrantes relacionadas con los artículos.
 * - Proveedores:
 *   - `ArticleService`: Contiene la lógica de negocio para gestionar los artículos.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
