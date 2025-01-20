import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepositorie } from "./user.repositorie";
import { HashService } from "src/shared/utils/hash.service";
import { GetUserDto } from "./dto/get-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepositorie: UserRepositorie,
        private readonly hashService: HashService
    ) {}

    async create(attributes: CreateUserDto): Promise<GetUserDto> {
        attributes.password = await this.hashService.createHash(attributes.password);

        const newUser = await this.userRepositorie.create(attributes);
        return newUser;
    }

    async getAll(): Promise<GetUserDto[]> {
        const users = await this.userRepositorie.getAll();

        return users
    }

    async deleteById(id: string | undefined) {
        if(!id) throw new BadRequestException("id user doesn't sended!");
        await this.userRepositorie.deleteById(id);
    }
}