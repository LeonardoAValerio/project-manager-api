import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashService } from 'src/shared/utils/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private hashService: HashService
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
}