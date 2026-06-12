const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '')

export const useApi = () => {
	const config = useRuntimeConfig()
	const token = useCookie('access', { maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' })

	const backendBase = trimTrailingSlash(config.public.backendBase || 'http://localhost:8080')
	const apiBase = trimTrailingSlash(config.public.apiBase || `${backendBase}/api/v1`)

	const resolveBaseURL = (path) => {
		if (/^https?:\/\//i.test(path)) return undefined
		if (path.startsWith('/api/') || path.startsWith('/address')) return backendBase
		return apiBase
	}

	const buildHeaders = (headers) => {
		const nextHeaders = new Headers(headers || {})
		nextHeaders.set('Accept', 'application/json')
		if (token.value) {
			nextHeaders.set('Authorization', `Bearer ${token.value}`)
		}
		return nextHeaders
	}

	const request = (path, options = {}) => {
		const { headers, ...rest } = options

		return $fetch(path, {
			baseURL: resolveBaseURL(path),
			...rest,
			headers: buildHeaders(headers)
		})
	}

	const get = (path, options = {}) => request(path, { ...options, method: 'GET' })
	const post = (path, body, options = {}) => request(path, { ...options, method: 'POST', body })
	const put = (path, body, options = {}) => request(path, { ...options, method: 'PUT', body })
	const del = (path, options = {}) => request(path, { ...options, method: 'DELETE' })

	const unwrap = (res) => (res && Object.prototype.hasOwnProperty.call(res, 'data') ? res.data : res)

	const extractList = (res) => {
		const data = unwrap(res)
		if (Array.isArray(data)) return data
		if (Array.isArray(data?.content)) return data.content
		if (Array.isArray(res?.content)) return res.content
		if (Array.isArray(res?.data?.content)) return res.data.content
		if (Array.isArray(res?.data)) return res.data
		return []
	}

	const statusCode = (error) =>
		error?.statusCode || error?.status || error?.response?.status || error?.data?.status

	const errorMessage = (error, fallback = 'Xatolik yuz berdi') =>
		error?.data?.message || error?.response?._data?.message || error?.message || fallback

	const isAuthError = (error) => {
		const status = statusCode(error)
		return status === 401 || status === 403
	}

	const fileUrl = (value) => {
		if (!value) return '/images/image.png'

		const raw = String(value)
		if (/^https?:\/\//i.test(raw)) return raw
		if (raw.startsWith('/images/') || raw.startsWith('/svg/') || raw.startsWith('/favicon')) return raw

		if (raw.startsWith('/')) {
			const normalized = raw.replace(/^\/api\/v1\/files\//, '/api/files/')
			return `${backendBase}${normalized}`
		}

		return `${backendBase}/api/files/view/${raw}`
	}

	return {
		backendBase,
		apiBase,
		token,
		get,
		post,
		put,
		del,
		unwrap,
		extractList,
		errorMessage,
		isAuthError,
		fileUrl
	}
}
