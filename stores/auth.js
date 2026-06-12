export const useAuthStore = defineStore('auth', () => {
	const api = useApi()
	const token = api.token
	const loading = ref(false)

	const isLoggedIn = computed(() => !!token.value)

	const login = async (email, password) => {
		loading.value = true
		try {
			const res = await api.post('/api/auth/login', { email, password })
			if (res.status && res.data) {
				token.value = res.data.token || res.data
				return { success: true }
			}
			return { success: false, message: res.message || 'Email yoki parol noto\'g\'ri' }
		} catch (e) {
			return { success: false, message: api.errorMessage(e) }
		} finally {
			loading.value = false
		}
	}

	const register = async (firstName, email, password, prePassword) => {
		loading.value = true
		try {
			const res = await api.post('/api/auth/register', { firstName, email, password, prePassword })
			if (res.status) return { success: true, message: res.message }
			return { success: false, message: res.message || 'Ro\'yxatdan o\'tish xatosi' }
		} catch (e) {
			return { success: false, message: api.errorMessage(e) }
		} finally {
			loading.value = false
		}
	}

	const verify = async (email, code, password) => {
		loading.value = true
		try {
			const res = await api.put('/api/auth/verify', null, {
				query: { email, code }
			})
			if (res.status) {
				if (password) {
					return await login(email, password)
				}
				return { success: true, message: res.message }
			}
			return { success: false, message: res.message || 'Tasdiqlash kodi noto\'g\'ri' }
		} catch (e) {
			return { success: false, message: api.errorMessage(e) }
		} finally {
			loading.value = false
		}
	}

	const logout = () => {
		token.value = null
		const cartStore = useCartStore()
		cartStore.clearLocalCart()
	}

	return { token, loading, isLoggedIn, login, register, verify, logout }
})
