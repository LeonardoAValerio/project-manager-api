import { Injectable } from "@nestjs/common";
import { hash } from "node:crypto"

@Injectable()
export class HashService {
    private get secret(): string {
        return process.env.SECRET_HASH
    }

    createHash(text: string) {
        const hashCreated = hash(this.secret, text);

        return hashCreated;
    }

    verifyHash(current: string, behavior: string) {
        const currentHash = hash(this.secret, current);
        const behaviorHash = hash(this.secret, behavior);

        return currentHash === behaviorHash;
    }
}