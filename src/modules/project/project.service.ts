import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectDto } from "./dto/get-project.dto";
import { ProjectRepositorie } from "./project.repositorie";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { GetColaboratorProjectDto } from "./dto/get-colaborators-project.dto";

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

    async getColaboratorsProject(id_project: string): Promise<GetColaboratorProjectDto[]> {
        const colaborators = await this.projectRepositorie.getAllColaborators(id_project);

        return colaborators;
    }

    async verifyUserInProject(id_project: string, id_user: string): Promise<undefined | GetColaboratorProjectDto> {
        const colaborators = await this.getColaboratorsProject(id_project);

        const colaborator = colaborators.find(colaborator => colaborator.id_user === id_user);
        return colaborator;
    }
}