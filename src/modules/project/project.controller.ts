import { Body, Controller, Get, Headers, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ProjectService } from "./project.service";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}

    @ApiBearerAuth("authorization")
    @ApiOkResponse({
        type: [GetProjectDto]
    })
    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getAll(@Req() req: Request) {
        const id_user = req.user.id;
        const projects = await this.projectService.getByIdUser(id_user);
        return projects;
    }

    @ApiBearerAuth("authorization")
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: GetProjectDto,
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: ValidationErrorResponse
    })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async post(@Body() body: CreateProjectDto, @Req() req: Request) {
        const id_user = req.user.id;
        const newProject = await this.projectService.createWithMasterUser(body, id_user);
        return newProject;
    }
    
    @ApiBearerAuth("authorization")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(["ADMIN", "MASTER"])
    @Post("invite")
    async inviteProject(@Headers("id_project") id_project: string) {
        return await this.projectService.createInvitationProject(id_project);
    }
}