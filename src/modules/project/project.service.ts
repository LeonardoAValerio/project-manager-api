import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectDto } from "./dto/get-project.dto";
import { ProjectRepositorie } from "./project.repositorie";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { Project } from "@prisma/client";

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepositorie: ProjectRepositorie,
        private readonly colaboratorService: ColaboratorService
    ) {}

    async createWithMasterUser(attributes: CreateProjectDto, id_user: string): Promise<GetProjectDto> {
        const newProject = await this.projectRepositorie.create(attributes);
        
        await this.colaboratorService.create({
            id_project: newProject.id,
            id_user: id_user,
            role: "MASTER"
        })

        return newProject;
    }

    async getAll(): Promise<GetProjectDto[]> {
        const projects = await this.projectRepositorie.getAll();
        return projects;
    }

    async getByIdUser(id_user: string): Promise<GetProjectDto[]> {
        const projects = await this.projectRepositorie.getByIdUser(id_user);

        return projects;
    }
}