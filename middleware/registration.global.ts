import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineNuxtRouteMiddleware(async to => {
  const { status, data } = useAuth();

  console.log('MIDDLEWARE');
  console.log(to.meta.middleware);
  console.log(status.value);
  console.log(data.value);
  if (to.meta.middleware === "auth" && status.value === "authenticated" && to.path !== "/app/verify-email" && (!data.value || !data.value.user.verifiedEmail)) {
    console.log('REDIRECTING');
    return navigateTo('/app/verify-email');
  }
});
