import { PrismaService } from "src/shared/database/prisma.service";
import { forwardRef, Module } from "@nestjs/common";
import { ColaboratorController } from "./colaborator.controller";
import { ColaboratorRepositorie } from "./colaborator.repositore";
import { ColaboratorService } from "./colaborator.service";
import { ProjectModule } from "../project/project.module";

@Module({
    imports: [forwardRef(() => ProjectModule)],
    controllers: [ColaboratorController],
    providers: [
        ColaboratorRepositorie, 
        ColaboratorService,
        PrismaService
    ],
    exports: [ColaboratorService]
})
export class ColaboratorModule {}