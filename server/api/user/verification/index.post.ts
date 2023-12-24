import { UserNotFoundError, UserMissingEmailError, InvalidVerificationTokenError, VerificationTokenExpiredError } from "~/lib/user/verification/errors";
import apiAuthHandler from "../../../../lib/auth/api-handler";
import z from "zod";
import { verifyEmail } from "~/lib/user/verification/verification-service";
import toError from "~/lib/errors/response/to-error";

const verificationPayload = z.object({
  token: z.string()
});

export default apiAuthHandler(async ({ event, session }) => {
  if (session.user.verifiedEmail) {
    return toError(event, 409, "EMAIL_ALREADY_VERIFIED");
  } else {
    try {
      await verifyEmail(session.user.id, (await readValidatedBody(event, verificationPayload.parse)).token);
    } catch (e) {
      if (e instanceof VerificationTokenExpiredError) {
        return toError(event, 400, "VERIFICATION_TOKEN_EXPIRED");
      } else if (e instanceof InvalidVerificationTokenError) {
        return toError(event, 400, "INVALID_VERIFICATION_TOKEN");
      } else if (e instanceof UserNotFoundError) {
        return toError(event, 400, "USER_NOT_FOUND");
      } else if (e instanceof UserMissingEmailError) {
        return toError(event, 400, "USER_MISSING_EMAIL");
      } else {
        throw e;
      }
    }
  }
});