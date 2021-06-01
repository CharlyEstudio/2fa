import { Body, Controller, Get, HttpStatus, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard }                                                          from "./auth/local-auth.guard";
import { AuthService }                                                 from "./auth/auth.service";
import { JwtAuthGuard }                                                from "./auth/jwt-auth.guard";
import { TotpAuthGuard }                                               from "./totp/guard/totp-auth.guard";
import { Response }                                                    from "express";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(TotpAuthGuard)
  @Post('totp')
  getTotp(@Request() req) {
    return this.authService.loginTotp(req.user);
  }

  @Patch('totp')
  async getVerifyTokenTotp(@Body() totp: any) {
    console.log(totp);
    return await this.authService.verifyTokeTotp(totp.user, totp.token);
    /*if (!verify) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: false,
        code: HttpStatus.UNAUTHORIZED,
        payload: 'El token verificador no está autorizado',
      });
    }

    res.status(HttpStatus.OK).json({
      status: true,
      code: HttpStatus.OK,
      payload: 'Autorizado',
    });*/
  }
}
