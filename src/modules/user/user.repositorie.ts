import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class UserRepositorie {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(attributes: User): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: attributes
        });

        return newUser;
    }

    async getAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        
        return users;
    }
}