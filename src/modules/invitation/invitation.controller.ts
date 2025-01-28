import { Controller, Get, Post, Query } from "@nestjs/common";
import { InvitationService } from "./invitation.service";
import { ApiCreatedResponse, ApiForbiddenResponse } from "@nestjs/swagger";

@Controller("invitation")
export class InvitationController {
    constructor(
        private invitationService: InvitationService
    ) {}

    @ApiCreatedResponse()
    @ApiForbiddenResponse({
        description: "Invalid token!"
    })
    @Get("accept")
    async acceptInvite(@Query("token") token: string) {
        await this.invitationService.acceptInvitation(token);
        return "<h1>Logado com successo!</h1>"
    }
}