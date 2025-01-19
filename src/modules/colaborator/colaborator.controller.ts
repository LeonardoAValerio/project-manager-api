import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ColaboratorService } from "./colaborator.service";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";

@Controller("colaborator")
export class ColaboratorController {
    constructor(
        private readonly colaboratorService: ColaboratorService
    ) {}

    @ApiOkResponse({
        type: [GetColaboratorDto]
    })
    @Get()
    async getAll() {
        const colaborators = await this.colaboratorService.getAll();

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