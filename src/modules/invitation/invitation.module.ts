import { Module } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { InvitationRepositorie } from "./invitation.repositorie";
import { InvitationService } from "./invitation.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [
        PrismaService,
        InvitationRepositorie,
        InvitationService,
        JwtService
    ],
    exports: [
        InvitationService
    ]
})
export class InvitationModule {}