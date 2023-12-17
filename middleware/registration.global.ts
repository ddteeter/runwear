export default defineNuxtRouteMiddleware(to => {
  if (to.meta.middleware === "auth") {
    const { status, data } = useAuth();

    console.log(status);
    console.log(data);
    if (status.value === "authenticated" && data.value?.user) {
    }
  }
});
