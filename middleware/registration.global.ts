export default defineNuxtRouteMiddleware(async to => {
  const { status, data } = useAuth();

  if (to.meta.middleware === "auth" && status.value === "authenticated" && 
      to.path !== "/app/user/verify-email" && (!data.value || !data.value.user.verifiedEmail)) {
    return navigateTo('/app/user/verify-email');
  }
});
