import { TotpAuthGuard } from './totp-auth.guard';

describe('TotpAuthGuard', () => {
  it('should be defined', () => {
    expect(new TotpAuthGuard()).toBeDefined();
  });
});
