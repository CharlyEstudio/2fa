import { TotpStrategy } from './totp.strategy';

describe('TotpStrategy', () => {
  it('should be defined', () => {
    expect(new TotpStrategy()).toBeDefined();
  });
});
