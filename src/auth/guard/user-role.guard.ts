import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

/**
 * Guard para verificar si un usuario tiene los roles necesarios para acceder a una ruta.
 * 
 * Este guard utiliza para obtener los roles válidos
 * definidos en el controlador o en el manejador de la ruta. Si el usuario no tiene
 * un rol válido, se lanza una excepción `ForbiddenException`.
 * 
 * @class
 */
@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}

  /**
   * Método principal que determina si un usuario puede acceder a una ruta protegida.
   * 
   * @param context - Contexto de ejecución que proporciona detalles sobre la solicitud
   * actual, incluyendo el manejador y el controlador.
   * @returns `true` si el usuario tiene un rol válido, de lo contrario lanza una excepción.
   * @throws {BadRequestException} Si no se encuentra un usuario en la solicitud.
   * @throws {ForbiddenException} Si el usuario no tiene un rol válido para acceder a la ruta.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;
    
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if ( !user ) 
      throw new BadRequestException('User not found');
    
    for (const role of user.roles ) {
      if ( validRoles.includes( role ) ) {
        return true;
      }
    }
    
    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    );
  }
}
