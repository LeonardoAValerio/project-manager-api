import { Injectable } from "@nestjs/common";
import { UserRepositorie } from "./user.repositorie";
import { User } from "@prisma/client";
import { hash } from "node:crypto";
import { HashService } from "src/shared/utils/hash.service";
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepositorie: UserRepositorie,
        private readonly hashService: HashService
    ) {}

    async create(attributes: User): Promise<GetUserDto> {
        attributes.password = this.hashService.createHash(attributes.password);

        const newUser = await this.userRepositorie.create(attributes);
        return newUser;
    }

    async getAll(): Promise<GetUserDto[]> {
        const users = await this.userRepositorie.getAll();

        return users;
    }
}