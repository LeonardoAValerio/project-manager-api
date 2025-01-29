import { PrismaService } from "src/shared/database/prisma.service";
import { ProjectController } from "./project.controller";
import { ProjectRepositorie } from "./project.repositorie";
import { ProjectService } from "./project.service";
import { forwardRef, Module } from "@nestjs/common";;
import { EmailService } from "src/shared/utils/email/email.service";
import { UserModule } from "../user/user.module";
import { InvitationModule } from "../invitation/invitation.module";
import { ColaboratorModule } from "../colaborator/colaborator.module";

@Module({
    imports: [
        UserModule, 
        InvitationModule,
        forwardRef(() => ColaboratorModule),
    ],
    controllers: [ProjectController],
    providers: [
        ProjectRepositorie, 
        ProjectService,
        PrismaService,
        EmailService
    ],
    exports: [ProjectService]
})
export class ProjectModule {}