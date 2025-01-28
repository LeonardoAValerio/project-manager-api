import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectDto } from "./dto/get-project.dto";
import { ProjectRepositorie } from "./project.repositorie";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { GetColaboratorProjectDto } from "./dto/get-colaborators-project.dto";
import { EmailService } from "src/shared/utils/email/email.service";
import { InviteProjectDto } from "./dto/invite-project.dto";
import { UserService } from "../user/user.service";
import { InvitationService } from "../invitation/invitation.service";

@Injectable()
export class ProjectService {
    constructor(
        private projectRepositorie: ProjectRepositorie,
        private colaboratorService: ColaboratorService,
        private userService: UserService,
        private invitationService: InvitationService,
        private emailService: EmailService 
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

    async inviteProjectToUser(props: InviteProjectDto) {
        const user = await this.userService.findByEmail(props.emailToInvite);
        if(!user) throw new BadRequestException("User email doesn't exist!");

        const project = await this.projectRepositorie.findById(props.idProject);
        const token = await this.invitationService.create({
            id_project: project.id,
            id_user_invite: props.userInviting.id,
            id_user_invited: user.id
        })

        await this.emailService.sendInvite(
            props.emailToInvite,
            project.name,
            props.userInviting.name,
            token.token
        )
    }
}