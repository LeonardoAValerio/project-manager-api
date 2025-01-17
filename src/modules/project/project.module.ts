import { PrismaService } from "src/shared/database/prisma.service";
import { ProjectController } from "./project.controller";
import { ProjectRepositorie } from "./project.repositorie";
import { ProjectService } from "./project.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [ProjectController],
    providers: [
        ProjectRepositorie, 
        ProjectService,
        PrismaService
    ]
})
export class ProjectModule {}