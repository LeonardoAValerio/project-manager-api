import { BadRequestException, Injectable } from "@nestjs/common";
import { InvitationRepositorie } from "./invitation.repositorie";
import { JwtService } from "@nestjs/jwt";
import { CreateInvitationDto } from "./dto/create-invitaton.dto";
import { ColaboratorService } from "../colaborator/colaborator.service";

@Injectable()
export class InvitationService {
    constructor(
        private invitationRepositorie: InvitationRepositorie,
        private jwtService: JwtService,
        private colaboratorService: ColaboratorService
    ) {}

    async create(props: CreateInvitationDto) {
        const expire_date = new Date();
        expire_date.setDate(expire_date.getSeconds() + 60);

        const newInvitation = await this.invitationRepositorie.create({
            expire_date: expire_date.toISOString(),
            ...props
        });

        const token = this.jwtService.sign(newInvitation, { expiresIn: "60s" });

        return {
            ...newInvitation,
            token: token
        }
    }

    private async validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return payload as CreateInvitationDto;
        } catch(error) {
            throw new BadRequestException("Invalid token!");
        }
    }

    async acceptInvitation(token: string) {
        const invitation = await this.validateToken(token);

        await this.colaboratorService.create({
            id_project: invitation.id_project,
            id_user: invitation.id_user_invited,
            role: "USER"
        });
    }
}