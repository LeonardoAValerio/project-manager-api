import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepositorie } from "./user.repositorie";
import { HashService } from "src/shared/utils/hash.service";
import { GetUserDto } from "./dto/get-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepositorie: UserRepositorie,
        private readonly hashService: HashService,
    ) {}

    async create(attributes: CreateUserDto): Promise<GetUserDto> {
        if((await this.userRepositorie.findAll()).some(user => user.email === attributes.email)) {
            throw new BadRequestException("Email user alredy exists!");
        }

        attributes.password = await this.hashService.createHash(attributes.password);

        const newUser = await this.userRepositorie.create(attributes);
        return newUser;
    }

    async getAll(): Promise<GetUserDto[]> {
        const users = await this.userRepositorie.findAll();

        return users
    }

    async findByEmail(email: string): Promise<User> {
        const users = await this.userRepositorie.findWithFilters({email});
        const user = users[0];

        return user;
    }

    async deleteById(id: string | undefined): Promise<void> {
        try {
            if(!id) throw new BadRequestException("id_user doesn't sended!");
            await this.userRepositorie.deleteById(id);
        } catch(error) {
            throw new BadRequestException("Not found user!")
        }
    }
}