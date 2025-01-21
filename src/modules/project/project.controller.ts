import { BadRequestException, Body, Controller, Get, Headers, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBasicAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ProjectService } from "./project.service";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { AuthUserGuard } from "src/shared/guards/auth-user.guard";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @ApiOkResponse({
        type: [GetProjectDto]
    })
    @ApiBasicAuth("authorization")
    @UseGuards(AuthUserGuard)
    @Get()
    async getAll() {
        const projects = await this.projectService.getAll();

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
    @ApiHeader({
        name: "id_user",
        description: "This id of user to create as a master of the project!",
        required: true
    })
    @ApiBasicAuth("authorization")
    @UseGuards(AuthUserGuard)
    @Post()
    async post(@Body() body: CreateProjectDto, @Headers("id_user") id_user: string) {
        if(!id_user) throw new BadRequestException("Doesn't sended id_user in headers!");

        const newProject = await this.projectService.createWithMasterUser(body, id_user);
        return newProject;
    }
}