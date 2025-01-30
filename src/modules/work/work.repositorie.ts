import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { CreateWorkDto } from "./dto/create-work.dto";

@Injectable()
export class WorkRepositorie {
    constructor(
        private prismaService: PrismaService
    ) {}

    async create(attributes: CreateWorkDto) {
        const { description, ...props } = attributes
        const newWork = await this.prismaService.work.create({
            data: {
                descrition: description,
                ...props            
            }
        })

        return newWork
    }
}