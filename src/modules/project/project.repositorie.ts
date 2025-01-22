import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectDto } from "./dto/get-project.dto";

@Injectable()
export class ProjectRepositorie {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(attributes: CreateProjectDto): Promise<GetProjectDto> {
        const newProject = await this.prisma.project.create({
            data: attributes,
        });

        return newProject;
    }

    async getAll(): Promise<GetProjectDto[]> {
        const projects = await this.prisma.project.findMany();
        
        return projects;
    }

    async getByIdUser(id_user: string) {
        const projects = await this.prisma.project.findMany({
            where: {
                Project: {
                    some: {
                        id_user
                    }
                }
            }
        });

        console.log(projects)
        return projects;
    }
}