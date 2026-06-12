export default defineNuxtRouteMiddleware(() => {
	const token = useCookie('access')
	if (!token.value) {
		return navigateTo('/')
	}
})
