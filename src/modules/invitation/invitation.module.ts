import { Module } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { InvitationRepositorie } from "./invitation.repositorie";
import { InvitationService } from "./invitation.service";

@Module({
    providers: [
        PrismaService,
        InvitationRepositorie,
        InvitationService
    ],
    exports: [
        InvitationService
    ]
})
export class InvitationModule {}