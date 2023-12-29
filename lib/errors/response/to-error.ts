import type { EventHandlerRequest, H3Event } from 'h3'

export default (
  event: H3Event<EventHandlerRequest>,
  status: number,
  code: string,
  data?: Record<any, any>,
) => {
  setResponseStatus(event, status)
  return {
    code,
    details: data,
  }
}
