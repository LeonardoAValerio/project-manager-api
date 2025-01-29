import { Module } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { InvitationService } from "./invitation.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ColaboratorModule } from "../colaborator/colaborator.module";
import { InvitationController } from "./invitation.controller";

@Module({
    imports: [
        ColaboratorModule,
        JwtModule.register({
            secret: process.env.SECRET_JWT
        })
    ],
    controllers: [
        InvitationController
    ],
    providers: [
        PrismaService,
        InvitationService
    ],
    exports: [
        InvitationService
    ]
})
export class InvitationModule {}