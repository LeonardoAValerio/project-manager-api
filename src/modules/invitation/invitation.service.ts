import { Injectable } from "@nestjs/common";
import { InvitationRepositorie } from "./invitation.repositorie";
import { JwtService } from "@nestjs/jwt";
import { CreateInvitationDto } from "./dto/create-invitaton.dto";

@Injectable()
export class InvitationService {
    constructor(
        private invitationRepositorie: InvitationRepositorie,
        private jwtService: JwtService
    ) {}

    async create(props: CreateInvitationDto) {
        const expire_date = new Date();
        expire_date.setDate(expire_date.getSeconds() + 60);

        const newInvitation = await this.invitationRepositorie.create({
            expire_date: expire_date.toISOString(),
            ...props
        });

        const token = this.jwtService.sign(newInvitation);

        return {
            ...newInvitation,
            token: token
        }
    }
}