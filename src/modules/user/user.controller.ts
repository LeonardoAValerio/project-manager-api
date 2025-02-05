import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { GetUserDto } from "./dto/get-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOkResponse({
        type: [GetUserDto]
    })
    @Get()
    async getAll() {
        const users = await this.userService.getAll();

        return users;
    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: GetUserDto,
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: ValidationErrorResponse
    })
    @ApiBadRequestResponse({
        description: "Email user alredy exists!",
    })
    @Post()
    async post(@Body() body: CreateUserDto) {
        const newUser = await this.userService.create(body);

        return newUser;
    }

    @ApiOkResponse({
        description: "The record has been successfully deleted."
    })
    @ApiBadRequestResponse({
        description: "id user doesn't sended!",
    })
    @Delete(":id_user")
    async delete(@Param("id_user") id: string) {
        await this.userService.deleteById(id);
    }

    @ApiOkResponse({
        description: "Get your profile.",
        type: GetUserDto
    })
    @ApiBearerAuth("authorization")
    @UseGuards(AuthGuard("jwt"))
    @Get("profile")
    async profile(@Req() req: Request) {
        const { name, email, id} = req.user;
        return {id, name, email}
    }
}