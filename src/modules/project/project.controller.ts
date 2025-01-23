import { BadRequestException, Body, Controller, Get, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBasicAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ProjectService } from "./project.service";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Request } from "express";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}

    @ApiOkResponse({
        type: [GetProjectDto]
    })
    @Get()
    async getAll(@Req() req: Request) {
        const id_user = "token.id";
        if(!id_user) throw new BadRequestException("Doesn't sended id_user in headers!");
        const projects = await this.projectService.getByIdUser(id_user);

        return projects;
    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: GetProjectDto,
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: ValidationErrorResponse
    })
    @Post()
    async post(@Body() body: CreateProjectDto, @Req() req: Request) {
        const id_user = "token.id";
        if(!id_user) throw new BadRequestException("Doesn't sended id_user in headers!");

        const newProject = await this.projectService.createWithMasterUser(body, id_user);
        return newProject;
    }
}