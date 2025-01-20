import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepositorie } from "./user.repositorie";
import { HashService } from "src/shared/utils/hash.service";
import { GetUserDto } from "./dto/get-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "src/shared/utils/jwt.service";
import { UserPayload } from "./interface/user-payload.interface";
import { Token } from "src/shared/utils/interfaces/token.interface";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepositorie: UserRepositorie,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService<UserPayload>
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

    async deleteById(id: string | undefined): Promise<void> {
        try {
            if(!id) throw new BadRequestException("id_user doesn't sended!");
            await this.userRepositorie.deleteById(id);
        } catch(error) {
            throw new BadRequestException("Not found user!")
        }
    }

    async validateLogin(login: LoginUserDto): Promise<Token> {
        const users = await this.userRepositorie.getFiltered({email: login.email});
        const user = users[0];

        if(!user) throw new BadRequestException("Invalid email or password!");
        if(await this.hashService.verifyHash(login.password, user.password)) {
            return this.jwtService.generateToken({...user}, "30d")
        }else {
            throw new BadRequestException("Invalid email or password!");
        }
    }
}