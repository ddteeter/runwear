export default class InvalidVerificationTokenError extends Error {
  constructor(public readonly userId: string, public readonly token: string) {
    super('Invalid verification token')
  }
};
