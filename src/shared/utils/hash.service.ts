import { Injectable } from "@nestjs/common"; 
import { compare, genSalt, hash } from "bcrypt"


@Injectable()
export class HashService {

    async createHash(text: string) {
        const saltRounds = await genSalt(10);
        const hashCreated = await hash(text, 10);

        return hashCreated;
    }

    async verifyHash(current: string, behavior: string) {
        return await compare(current, behavior);
    }
}