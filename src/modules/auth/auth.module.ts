import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { HashService } from "src/shared/utils/hash.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { ProjectModule } from "../project/project.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
        ProjectModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, HashService, JwtStrategy],
    exports: [LocalStrategy, JwtStrategy]
})
export class AuthModule {}