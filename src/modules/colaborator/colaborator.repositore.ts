import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";

@Injectable()
export class ColaboratorRepositorie {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(attributes: CreateColaboratorDto): Promise<GetColaboratorDto> {
        const newColaborator = await this.prisma.colaboratorProject.create({
            data: attributes,
        });

        return newColaborator;
    }

    async findAll(): Promise<GetColaboratorDto[]> {
        const colaborators = await this.prisma.colaboratorProject.findMany();
        
        return colaborators;
    }
}