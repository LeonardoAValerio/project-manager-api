import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getAll() {
        const users = await this.userService.getAll();

        return users;
    }

    @Post()
    async post(@Body() body: CreateUserDto) {
        const newUser = await this.userService.create(body);

        return newUser;
    }
}