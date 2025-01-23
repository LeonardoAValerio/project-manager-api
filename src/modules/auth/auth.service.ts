import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashService } from 'src/shared/utils/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private hashService: HashService,
    private jwtService: JwtService
) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const validate = await this.hashService.verifyHash(pass, user.password);
    if (user && validate) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}