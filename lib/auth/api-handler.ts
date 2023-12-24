import { getServerSession } from '#auth'
import { H3Event, type EventHandlerRequest } from "h3";
import type { Session } from 'next-auth';

export default (handler: (arg: { event: H3Event<EventHandlerRequest>, session: Session }) => Promise<any>) =>
  defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session || !session.user) {
      setResponseStatus(event, 401);
    } else {
      return await handler({ event, session} );
    }
  });