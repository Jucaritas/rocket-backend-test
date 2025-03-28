import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guard/user-role.guard";


export function Auth( ...roles: ValidRoles[] ) {

    return applyDecorators(
        RoleProtected( ...roles ),
        UseGuards(AuthGuard(), UserRoleGuard)        
    );

}
