import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { InvitationService } from "./invitation.service";
import { ApiCreatedResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("invitation")
export class InvitationController {
    constructor(
        private invitationService: InvitationService
    ) {}

    @ApiCreatedResponse()
    @ApiForbiddenResponse({
        description: "Invalid token!"
    })
    @UseGuards(AuthGuard("jwt"))
    @Get("accept")
    async acceptInvite(@Query("token") token: string, @Req() req: Request) {
        await this.invitationService.acceptInvitation(token, req.user);
        return "<h1>Logado com successo!</h1>"
    }
}