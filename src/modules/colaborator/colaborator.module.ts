import { PrismaService } from "src/shared/database/prisma.service";
import { Module } from "@nestjs/common";
import { ColaboratorController } from "./colaborator.controller";
import { ColaboratorRepositorie } from "./colaborator.repositore";
import { ColaboratorService } from "./colaborator.service";

@Module({
    controllers: [ColaboratorController],
    providers: [
        ColaboratorRepositorie, 
        ColaboratorService,
        PrismaService
    ]
})
export class ColaboratorModule {}