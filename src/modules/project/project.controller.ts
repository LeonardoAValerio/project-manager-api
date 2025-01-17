import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ProjectService } from "./project.service";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @ApiOkResponse({
        type: [GetProjectDto]
    })
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
    @Post()
    async post(@Body() body: CreateProjectDto) {
        const newProject = await this.projectService.create(body);

        return newProject;
    }
}