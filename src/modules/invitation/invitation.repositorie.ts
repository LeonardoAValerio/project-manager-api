import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { CreateInvitationRepositoryDto } from "./dto/create-invitation-repository.dto";

@Injectable()
export class InvitationRepositorie {
    constructor(
        private prismaService: PrismaService
    ) {}

    async create(props: CreateInvitationRepositoryDto) {
        const newInvitation = await this.prismaService.invitation.create({
            data: props
        });

        return newInvitation;
    }
}