import { forwardRef, Module } from "@nestjs/common";
import { WorkController } from "./work.controller";
import { WorkRepositorie } from "./work.repositorie";
import { PrismaService } from "src/shared/database/prisma.service";
import { WorkService } from "./work.service";
import { ProjectModule } from "../project/project.module";

@Module({
    imports: [
        forwardRef(() => ProjectModule)
    ],
    controllers: [WorkController],
    providers: [
        PrismaService,
        WorkRepositorie,
        WorkService
    ],
    exports: [
        WorkService
    ]
})
export class WorkModule {}