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
        if((await this.userRepositorie.getAll()).some(user => user.email === attributes.email)) {
            throw new BadRequestException("Email user alredy exists!");
        }

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
        try {
            await this.userRepositorie.deleteById(id);
        } catch(error) {
            throw new BadRequestException("Not found user!")
        }
    }
}