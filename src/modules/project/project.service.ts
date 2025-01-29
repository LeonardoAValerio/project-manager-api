import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectDto } from "./dto/get-project.dto";
import { ProjectRepositorie } from "./project.repositorie";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { GetColaboratorProjectDto } from "./dto/get-colaborators-project.dto";
import { EmailService } from "src/shared/utils/email/email.service";
import { UserService } from "../user/user.service";
import { InvitationService } from "../invitation/invitation.service";

@Injectable()
export class ProjectService {
    constructor(
        private projectRepositorie: ProjectRepositorie,
        private colaboratorService: ColaboratorService,
        private userService: UserService,
        private invitationService: InvitationService,
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
        const projects = await this.projectRepositorie.findAll();
        return projects;
    }

    async getByIdUser(id_user: string): Promise<GetProjectDto[]> {
        const projects = await this.projectRepositorie.findByIdUser(id_user);

        return projects;
    }

    async getColaboratorsProject(id_project: string): Promise<GetColaboratorProjectDto[]> {
        const colaborators = await this.projectRepositorie.findColaborators(id_project);

        return colaborators;
    }

    async verifyUserInProject(id_project: string, id_user: string): Promise<undefined | GetColaboratorProjectDto> {
        const colaborators = await this.getColaboratorsProject(id_project);

        const colaborator = colaborators.find(colaborator => colaborator.id_user === id_user);
        return colaborator;
    }

    async createInvitationProject(id_project: string) {
        const project = await this.projectRepositorie.findById(id_project);
        console.log(project);
        const token = await this.invitationService.create({
            id_project: project.id,
            name: project.name
        })

        return token;
    }
}