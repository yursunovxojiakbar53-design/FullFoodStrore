const decodeJwtPayload = (token: string) => {
	try {
		const payload = token.split('.')[1]

		console.log('RAW PAYLOAD:', payload)

		const normalized = payload
			.replace(/-/g, '+')
			.replace(/_/g, '/')

		const padded = normalized.padEnd(
			normalized.length + ((4 - (normalized.length % 4)) % 4),
			'='
		)

		if (typeof globalThis.atob !== 'function') {
			console.log('ATOB NOT AVAILABLE')
			return null
		}

		const json = globalThis.atob(padded)

		console.log('DECODED JSON:', json)

		return JSON.parse(json)
	} catch (error) {
		console.error('JWT DECODE ERROR:', error)
		return null
	}
}

export default defineNuxtRouteMiddleware((to) => {
	console.log('==========================')
	console.log('ADMIN MIDDLEWARE START')
	console.log('ROUTE:', to.path)

	const token = useCookie<string | null>('access')

	console.log('TOKEN EXISTS:', !!token.value)
	console.log('TOKEN:', token.value)

	if (!token.value) {
		console.log('NO TOKEN -> REDIRECT')
		return navigateTo('/')
	}

	const payload = decodeJwtPayload(token.value)

	console.log('PAYLOAD:', payload)

	const roles = Array.isArray(payload?.roles)
		? payload.roles
		: []

	const permissions = Array.isArray(payload?.permissions)
		? payload.permissions
		: []

	console.log('ROLES:', roles)
	console.log('PERMISSIONS:', permissions)

	const authorities = [...roles, ...permissions]
		.map(item => String(item).toUpperCase())

	console.log('AUTHORITIES:', authorities)

	const isAdmin = authorities.some(
		(item) =>
			item === 'ROLE_ADMIN' ||
			item === 'ROLE_SUPER_ADMIN' ||
			item === 'ADMIN' ||
			item === 'SUPER_ADMIN'
	)

	console.log('IS_ADMIN:', isAdmin)

	if (!isAdmin) {
		console.log('ADMIN ACCESS DENIED -> REDIRECT')
		return navigateTo('/')
	}

	console.log('ADMIN ACCESS GRANTED')
	console.log('==========================')
})