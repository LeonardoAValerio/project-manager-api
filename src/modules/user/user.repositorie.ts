import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/shared/database/prisma.service";
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class UserRepositorie {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(attributes: User): Promise<GetUserDto> {
        const newUser = await this.prisma.user.create({
            data: attributes,
            
        });

        return newUser;
    }

    async getAll(): Promise<GetUserDto[]> {
        const users = await this.prisma.user.findMany({
            omit: {
                password: true
            }
        });
        
        return users;
    }
}