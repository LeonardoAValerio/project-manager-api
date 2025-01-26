import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ProjectService } from "../project/project.service";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private projectService: ProjectService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const params = request.params;

        const id_project = params.id;
        const id_user = request.user.id;
        const colaborator =  await this.projectService.verifyUserInProject(id_project, id_user);

        if(!colaborator) return false;
        if(!roles) return true;
        return roles.some(role => role === colaborator.role);
    }
}