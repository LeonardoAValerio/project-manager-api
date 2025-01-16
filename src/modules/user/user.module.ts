import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepositorie } from "./user.repositorie";
import { UserService } from "./user.service";
import { PrismaService } from "src/shared/database/prisma.service";
import { HashService } from "src/shared/utils/hash.service";

@Module({
    controllers: [UserController],
    providers: [
        UserService, 
        UserRepositorie,
        PrismaService,
        HashService
    ]
})
export class UserModule {}