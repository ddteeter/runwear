import postmark from "postmark";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";
import { addDays, isBefore } from "date-fns";
import { InvalidVerificationTokenError, VerificationTokenExpiredError } from "./errors";
import UserNotFoundError from "./errors/UserNotFoundError";
import UserMissingEmailError from "./errors/UserMissingEmailError";

const runtimeConfig = useRuntimeConfig();

const postmarkClient = new postmark.ServerClient(runtimeConfig.email.postmark.apiKey);

const prisma = new PrismaClient();

const getVerificationTokenIdentifier = (userId: string) => {
  return `user:${userId}:email`;
};

export const sendVerificationEmail = async (userId: string, email?: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user === undefined || user === null) {
    throw new UserNotFoundError(userId);
  } else if (!user.email) {
    if (email) {
      await prisma.user.update({ where: { id: userId }, data: { email } });
    } else {
      throw new UserMissingEmailError(userId);
    }
  }

  const verificationKey = nanoid(32);

  await prisma.verificationToken.create({ 
    data: { 
      identifier: getVerificationTokenIdentifier(userId), 
      token: verificationKey,
      expires: addDays(new Date(), 1)
    } 
  });
  
  const verificationUrl = `${runtimeConfig.server.app.baseUri}/user/verify-email?token=${encodeURIComponent(verificationKey)}`;

  console.log("Sending email");
  postmarkClient.sendEmail({
    "From": "drew@drewteeter.com",
    // user.email
    "To": "drew@drewteeter.com",
    "Subject": "Verify Your Email at RunWearing",
    "HtmlBody": `Click <a href=${verificationUrl}>here</a> to verify your email.`,
    "TextBody": `Open the following URL in a browser to verify your email. ${verificationUrl}`,
    "MessageStream": "outbound"
  });
};

export const verifyEmail = async (userId: string, token: string) => {
  const verificationToken = await prisma.verificationToken.findUnique({ 
    where: { identifier: getVerificationTokenIdentifier(userId), token } 
  });

  if (verificationToken) {
    if (isBefore(new Date(), verificationToken.expires)) {
      await prisma.user.update({ where: { id: userId }, data: { emailVerified: new Date() } });
      await prisma.verificationToken.delete({ where: { token: verificationToken.token } });
    } else {
      throw new VerificationTokenExpiredError(userId, verificationToken.expires, token);
    }
  } else {
    throw new InvalidVerificationTokenError(userId, token);
  }
};