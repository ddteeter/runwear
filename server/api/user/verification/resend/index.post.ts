import z from 'zod'
import apiAuthHandler from '~/lib/auth/api-handler'

import { sendVerificationEmail } from '~/lib/user/verification/verification-service'
import toError from '~/lib/errors/response/to-error'

const verificationPayload = z.object({
  email: z.string().email().optional(),
})

export default apiAuthHandler(async ({ event, session }) => {
  if (session.user.verifiedEmail)
    return toError(event, 409, 'EMAIL_ALREADY_VERIFIED')
  else
    await sendVerificationEmail(session.user.id, (await readValidatedBody(event, verificationPayload.parse)).email)
})
