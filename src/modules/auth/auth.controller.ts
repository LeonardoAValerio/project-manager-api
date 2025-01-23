import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { LoginDto } from "./dto/login-dto.dto";
import { TokenDto } from "./dto/token.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({
        description: 'Logged with succesfully.',
        type: TokenDto,
    })
    @ApiForbiddenResponse({
        description: 'Invalid user'
    })
    @ApiBody({type: LoginDto, required: true})
    @Post("login")
    @UseGuards(AuthGuard("local"))
    async login(@Req() req: Request) {
        return this.authService.login(req.user);
    }
}