export const useProfileStore = defineStore('profileStore', () => {
	const token = useCookie('access')
	const profile = ref(null)
	const loading = ref(false)

	// JWT tokendan ma'lumot olish
	const decodeToken = (t) => {
		try {
			const base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
			const json = globalThis.atob
				? globalThis.atob(base64)
				: Buffer.from(base64, 'base64').toString('utf-8')
			return JSON.parse(json)
		} catch {
			return null
		}
	}

	const loadFromToken = () => {
		if (!token.value) return
		const decoded = decodeToken(token.value)
		if (decoded) {
			profile.value = {
				email: decoded.sub || decoded.email,
				roles: decoded.roles || decoded.permissions || []
			}
		}
	}

	const fetchProfile = () => {
		loadFromToken()
	}

	watch(token, (val) => {
		if (val) loadFromToken()
		else profile.value = null
	}, { immediate: true })

	return { profile, loading, fetchProfile }
})
