import { Injectable } from "@nestjs/common";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Token } from "./token.interface";

@Injectable()
export class JwtService<Payload extends object> {
    private get secret() {
        return process.env.SECRET_JWT;
    }
    
    generateToken(payload: Payload, expiriesIn: string | number): Token {
        const token = sign(payload, this.secret, {expiresIn: expiriesIn});
        return {token};
    }

    validateToken(token: string) {
        try {
            verify(token, this.secret)
            return true;
        } catch(error) {
            return false;
        }
    }

    decodeToken(token: string) {
        try {
            const tokenJwt = verify(token, this.secret) as Payload;
            return tokenJwt
        } catch(error) {
            return undefined;
        }
    }
}