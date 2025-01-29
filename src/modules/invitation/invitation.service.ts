import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateInvitationDto } from "./dto/create-invitaton.dto";
import { ColaboratorService } from "../colaborator/colaborator.service";
import { GetUserDto } from "../user/dto/get-user.dto";

@Injectable()
export class InvitationService {
    constructor(
        private jwtService: JwtService,
        private colaboratorService: ColaboratorService
    ) {}

    async create(props: CreateInvitationDto) {
        const token = this.jwtService.sign(props, { expiresIn: "1d" });

        return {
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

    async acceptInvitation(token: string, user: GetUserDto) {
        const invitation = await this.validateToken(token);

        try {
            await this.colaboratorService.create({
                id_project: invitation.id_project,
                id_user: user.id,
                role: "USER"
            });
        } catch(error) {
            throw new BadRequestException("User alredy exists!");
        }
    }
}