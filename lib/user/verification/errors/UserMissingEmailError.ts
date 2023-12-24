export default class UserMissingEmailError extends Error {
  constructor(public readonly userId: string) {
    super("User not found");
  }
};