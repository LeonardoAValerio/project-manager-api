import { Module } from "@nestjs/common";
import { WorkController } from "./work.controller";
import { WorkRepositorie } from "./work.repositorie";
import { PrismaService } from "src/shared/database/prisma.service";
import { WorkService } from "./work.service";

@Module({
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