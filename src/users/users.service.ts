import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'pablo',
      password: 'Passw0rd',
      secret: '',
      uri: '',
      qr: '',
    },
    {
      userId: 2,
      username: 'charly',
      password: 'Passw0rd',
      secret: '',
      uri: '',
      qr: '',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async updateTotp(userParam: any, totp: any): Promise<User | undefined> {
    const index = await this.users.findIndex(
      (user) => user.userId === userParam.userId,
    );
    this.users[index].secret = totp.secret;
    this.users[index].uri = totp.uri;
    this.users[index].qr = totp.qr;
    return this.users[index];
  }
}
