const decodeJwtPayload = (token: string) => {
	try {
		const payload = token.split('.')[1]
		const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
		if (typeof globalThis.atob !== 'function') return null
		const json = globalThis.atob(normalized)
		return JSON.parse(json)
	} catch {
		return null
	}
}

export default defineNuxtRouteMiddleware(() => {
	const token = useCookie<string | null>('access')

	if (!token.value) {
		return navigateTo('/')
	}

	const payload = decodeJwtPayload(token.value)
	const roles = Array.isArray(payload?.roles) ? payload.roles : []
	const permissions = Array.isArray(payload?.permissions) ? payload.permissions : []
	const authorities = [...roles, ...permissions].map((item) => String(item).toUpperCase())

	const isAdmin = authorities.some((item) =>
		item === 'ADMIN' ||
		item === 'SUPER_ADMIN' ||
		item === 'ROLE_ADMIN' ||
		item === 'ROLE_SUPER_ADMIN'
	)

	if (!isAdmin) {
		return navigateTo('/')
	}
})
