import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as twofactor       from 'node-2fa';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
  }

  async validateUserTotp(username: string): Promise<any> {
    return await this.userService.findOne(username);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginTotp(user: any) {
    const totp = twofactor.generateSecret({
      name: `Signot::Notario::${user.username}`,
      account: user.account,
    });
    const { password, ...results } = await this.userService.updateTotp(
      user,
      totp,
    );
    return results;
  }

  async verifyTokeTotp(user: string, token: string) {
    const userDB = await this.userService.findOne(user);
    return twofactor.verifyToken(userDB.secret, token, 0);
    // return !!verify;
  }
}
