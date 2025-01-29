import { Body, Controller, Get, Header, Headers, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ColaboratorService } from "./colaborator.service";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";

@Controller("colaborator")
export class ColaboratorController {
    constructor(
        private readonly colaboratorService: ColaboratorService
    ) {}

    @ApiOkResponse({
        type: [GetColaboratorDto]
    })
    @ApiBearerAuth("authorization")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Get()
    async getAll(@Headers("id_project") id_project: string) {
        const colaborators = await this.colaboratorService.findAllByProject(id_project);

        return colaborators;
    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: GetColaboratorDto,
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: ValidationErrorResponse
    })
    @Post()
    async post(@Body() body: CreateColaboratorDto) {
        const newColaborator = await this.colaboratorService.create(body);

        return newColaborator;
    }
}