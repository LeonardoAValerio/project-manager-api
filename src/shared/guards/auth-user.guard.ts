import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "../utils/jwt/jwt.service";

@Injectable()
export class AuthUserGuard implements CanActivate {
    
    constructor(
        private readonly jwtService: JwtService<any>
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers["authorization"];
        
        return this.jwtService.validateToken(token);    
    }
}