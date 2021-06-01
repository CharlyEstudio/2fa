import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy }                          from "passport-local";
import { PassportStrategy }                  from '@nestjs/passport';
import { AuthService }                       from "../../auth/auth.service";

@Injectable()
export class TotpStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: string) {
    const userDB = await this.authService.validateUserTotp(user);
    if (!userDB) {
      throw new UnauthorizedException();
    }

    return userDB;
  }
}
