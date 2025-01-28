import { PrismaService } from "src/shared/database/prisma.service";
import { ProjectController } from "./project.controller";
import { ProjectRepositorie } from "./project.repositorie";
import { ProjectService } from "./project.service";
import { Module } from "@nestjs/common";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { ColaboratorRepositorie } from "../colaborator/colaborator.repositore";
import { EmailService } from "src/shared/utils/email/email.service";
import { UserModule } from "../user/user.module";
import { InvitationModule } from "../invitation/invitation.module";

@Module({
    imports: [UserModule, InvitationModule],
    controllers: [ProjectController],
    providers: [
        ProjectRepositorie, 
        ProjectService,
        PrismaService,
        ColaboratorService,
        ColaboratorRepositorie,
        EmailService
    ],
    exports: [ProjectService]
})
export class ProjectModule {}