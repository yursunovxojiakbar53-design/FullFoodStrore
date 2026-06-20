export const useWishlistStore = defineStore('wishlist', () => {
	const api = useApi()
	const token = api.token

	const items = ref([]) // [{ id: wishlistItemId, product }]
	const loading = ref(false)
	const fetched = ref(false)

	const count = computed(() => items.value.length)
	const favoriteIds = computed(() => new Set(items.value.map((w) => w.product?.id).filter(Boolean)))
	const isFavorite = (productId) => favoriteIds.value.has(productId)

	const fetch = async () => {
		if (!token.value) {
			items.value = []
			return
		}
		loading.value = true
		try {
			const res = await api.get('/api/v1/wishlists')
			items.value = api.extractList(res).map((w) => ({ id: w.id, product: w.product }))
		} catch (e) {
			items.value = []
		} finally {
			loading.value = false
			fetched.value = true
		}
	}

	// Mahsulot kartalari uchun — bir marta yuklaydi
	const ensureLoaded = async () => {
		if (fetched.value) return
		fetched.value = true
		await fetch()
	}

	const add = async (product) => {
		if (!token.value) {
			alert("Sevimlilarga qo'shish uchun tizimga kiring")
			return
		}
		if (isFavorite(product.id)) return
		try {
			const res = await api.post('/api/v1/wishlists', { productId: product.id })
			const created = api.unwrap(res)
			items.value.push({ id: created?.id, product: created?.product || product })
		} catch (e) {
			await fetch()
		}
	}

	const remove = async (productId) => {
		const entry = items.value.find((w) => w.product?.id === productId)
		if (!entry) return
		items.value = items.value.filter((w) => w.product?.id !== productId)
		if (!token.value || !entry.id) return
		try {
			await api.del(`/api/v1/wishlists/${entry.id}`)
		} catch (e) {
			await fetch()
		}
	}

	const toggle = async (product) => {
		if (isFavorite(product.id)) await remove(product.id)
		else await add(product)
	}

	const clear = async () => {
		const all = [...items.value]
		items.value = []
		for (const w of all) {
			if (w.id) {
				try {
					await api.del(`/api/v1/wishlists/${w.id}`)
				} catch {}
			}
		}
	}

	return { items, loading, count, isFavorite, fetch, ensureLoaded, add, remove, toggle, clear }
})
