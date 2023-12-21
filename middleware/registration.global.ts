export default defineNuxtRouteMiddleware(to => {
    const { status, data } = useAuth();

    console.log(status.value);
    console.log(data.value);
    if (status.value === "authenticated" && data.value?.user) {
    }
});
