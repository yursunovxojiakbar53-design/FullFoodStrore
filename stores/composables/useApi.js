export const useApi = () => {
	const config = useRuntimeConfig()
	const token = useCookie('access')

	const base = config.public.backendBase

	const headers = () => ({
		...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
	})

	const get = (path) =>
		$fetch(`${base}${path}`, { headers: headers() })

	const post = (path, body) =>
		$fetch(`${base}${path}`, { method: 'POST', headers: headers(), body })

	const put = (path, body) =>
		$fetch(`${base}${path}`, { method: 'PUT', headers: headers(), body })

	const del = (path) =>
		$fetch(`${base}${path}`, { method: 'DELETE', headers: headers() })

	return { get, post, put, del }
}
