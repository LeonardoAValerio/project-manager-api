import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";
import { PutColaboratorDto } from "./dto/put-colaborator.dto";

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

    async findFiltered(filters: Partial<GetColaboratorDto>): Promise<GetColaboratorDto[]> {
        const colaborators = await this.prisma.colaboratorProject.findMany({
            where: filters
        });
        
        return colaborators;
    }

    async deleteById(id: string): Promise<void> {
        await this.prisma.colaboratorProject.delete({
            where: {
                id_colaborator: id
            }
        })
    }

    async findById(id: string): Promise<GetColaboratorDto> {
        const colaborator = await this.prisma.colaboratorProject.findFirst({
            where: {
                id_colaborator: id
            }
        });
        
        return colaborator;
    }

    async findByIdUserAndProject(id_user: string, id_project: string): Promise<GetColaboratorDto> {
        const colaborator = await this.prisma.colaboratorProject.findFirst({
            where: {
                id_user,
                id_project
            }
        });
        
        return colaborator;
    }

    async updateById(id: string, attributes: PutColaboratorDto): Promise<GetColaboratorDto> {
        const updateColaborator = await this.prisma.colaboratorProject.update({
            where: {
                id_colaborator: id
            },
            data: attributes
        });

        return updateColaborator;
    }
}