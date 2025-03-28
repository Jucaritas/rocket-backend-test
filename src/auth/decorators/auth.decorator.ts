import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guard/user-role.guard";


/**
 * Decorador de autorización que aplica restricciones de roles y protecciones de guardias.
 * 
 * @param {...ValidRoles[]} roles - Lista de roles válidos que se requieren para acceder al recurso.
 * 
 * Este decorador combina múltiples decoradores utilizando `applyDecorators`:
 * - `RoleProtected`: Restringe el acceso basado en los roles proporcionados.
 * - `UseGuards`: Aplica los guardias `AuthGuard` y `UserRoleGuard` para manejar la autenticación y la autorización.
 * 
 * Ejemplo de uso:
 * ```typescript
 * @Auth('admin', 'user')
 * ```
 */
export function Auth( ...roles: ValidRoles[] ) {

    return applyDecorators(
        RoleProtected( ...roles ),
        UseGuards(AuthGuard(), UserRoleGuard)        
    );

}
