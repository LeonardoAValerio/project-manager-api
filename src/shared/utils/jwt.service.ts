import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { Token } from "./interfaces/token.interface";

@Injectable()
export class JwtService<Payload> {
    private get secret() {
        return process.env.SECRET_JWT;
    }
    
    generateToken(payload: Payload, expiriesIn: string | number): Token {
        const token = sign({payload}, this.secret, {expiresIn: expiriesIn});
        return {token};
    }
}