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

    async findAll(): Promise<GetProjectDto[]> {
        const projects = await this.prisma.project.findMany();
        
        return projects;
    }

    async findByIdUser(id_user: string) {
        const projects = await this.prisma.project.findMany({
            where: {
                Project: {
                    some: {
                        id_user
                    }
                }
            }
        });

        return projects;
    }

    async findColaborators(id_project: string) {
        const colaboratorsBD = await this.prisma.project.findUnique({
            where: {
                id: id_project
            },
            select: {
                Project: {
                    select: {
                        id_user: true,
                        id_colaborator: true,
                        role: true,
                        User: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        })

        const colaborators = colaboratorsBD.Project.map(colaborator => {
            const { User, ...result } = colaborator;
            const mappedColaborator = { name:User.name, ...result }
            return mappedColaborator;
        });
        return colaborators;
    }
}