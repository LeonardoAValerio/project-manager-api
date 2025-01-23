import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { HashService } from "src/shared/utils/hash.service";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, HashService],
    exports: [LocalStrategy]
})
export class AuthModule {}