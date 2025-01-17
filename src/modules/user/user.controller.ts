import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ValidationErrorResponse } from "src/shared/utils/responses/validation-error.response";
import { GetUserDto } from "./dto/get-user.dto";

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
    @Post()
    async post(@Body() body: CreateUserDto) {
        const newUser = await this.userService.create(body);

        return newUser;
    }
}