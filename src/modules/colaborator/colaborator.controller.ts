import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { ColaboratorService } from "./colaborator.service";
import { GetColaboratorDto } from "./dto/get-colaborator.dto";
import { CreateColaboratorDto } from "./dto/create-colaborator.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { PutColaboratorDto } from "./dto/put-colaborator.dto";
import { Request } from "express";

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

    @ApiBearerAuth("authorization")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(["MASTER", "ADMIN"])
    @Delete(":id")
    async delete(@Param("id") id: string, @Headers("id_project") id_project: string) {
        const result = await this.colaboratorService.deleteById(id);
        return result;
    }

    @ApiBearerAuth("authorization")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(["MASTER", "ADMIN"])
    @Put(":id")
    async put(@Param("id") id: string, @Headers("id_project") id_project: string, @Body() body: PutColaboratorDto, @Req() req: Request) {
        const colaborator = await this.colaboratorService.putById(id, body, {id_project, ...req.user});
        return colaborator;
    }
}