import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controlador para manejar las operaciones relacionadas con la autenticación.
 * 
 * Este controlador proporciona endpoints para registrar nuevos usuarios y 
 * para iniciar sesión en el sistema.
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  /**
   * Constructor del controlador de autenticación.
   * 
   * @param authService - Servicio de autenticación utilizado para manejar 
   * las operaciones de registro e inicio de sesión.
   */
  constructor(private readonly authService: AuthService) { }

  /**
   * Endpoint para registrar un nuevo usuario.
   * 
   * @param createUserDto - Objeto DTO que contiene los datos necesarios 
   * para crear un nuevo usuario.
   * @returns Una promesa que resuelve con los datos del usuario creado.
   */
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  /**
   * Endpoint para iniciar sesión de un usuario.
   * 
   * @param loginUserDto - Objeto DTO que contiene las credenciales del usuario.
   * @returns Una promesa que resuelve con los datos de autenticación del usuario.
   */
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

}
