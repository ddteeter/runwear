export default class VerificationTokenExpired extends Error {
  constructor(public readonly userId: string, public readonly expiredAt: Date, public readonly token: string) {
    super("Verification token expired");
  }
};