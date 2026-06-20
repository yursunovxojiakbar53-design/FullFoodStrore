export const useCartStore = defineStore(
	'cart',
	() => {
		const api = useApi()
		const token = api.token
		const items = ref([])
		const loading = ref(false)
		const error = ref(null)

		const totalPrice = computed(() =>
			items.value.reduce((acc, item) => acc + Number(item.out_price || 0) * Number(item.quantity || 0), 0)
		)

		const isInCart = (id) => items.value.some((item) => item.id === id)

		const getItemTotal = (id) => {
			const item = items.value.find((cartItem) => cartItem.id === id)
			return item ? Number(item.out_price || 0) * Number(item.quantity || 0) : 0
		}

		const mapBackendItem = (item) => {
			// Lokal (kartadan qo'shilgan) ma'lumotni saqlab qolish: tavsif, rasm, narx
			const existing = items.value.find((i) => i.id === item.productId)
			return {
				id: item.productId,
				cartItemId: item.id,
				title: { uz: item.productName || existing?.title?.uz || '' },
				description: existing?.description || { uz: '' },
				out_price: Number(item.productPrice || existing?.out_price || 0),
				currency: "so'm",
				quantity: Number(item.quantity || 1),
				image: item.attachmentId || item.image || existing?.image || null
			}
		}

		const applyBackendCart = (cart) => {
			const backendItems = cart?.items || []
			items.value = backendItems.map(mapBackendItem)
		}

		const syncFromBackend = async () => {
			if (!token.value) return
			loading.value = true
			error.value = null
			try {
				const res = await api.get('/carts')
				applyBackendCart(api.unwrap(res))
			} catch (e) {
				error.value = api.errorMessage(e, 'Savat yuklanmadi')
				console.error('Savat sync xatosi:', error.value)
			} finally {
				loading.value = false
			}
		}

		const addToCart = async (product) => {
			const item = items.value.find((cartItem) => cartItem.id === product.id)
			if (item) {
				item.quantity += 1
			} else {
				items.value.push({ ...product, quantity: 1 })
			}

			if (!token.value) return

			try {
				const res = await api.post('/carts/add', { productId: product.id, quantity: 1 })
				applyBackendCart(api.unwrap(res))
			} catch (e) {
				error.value = api.errorMessage(e, 'Savatga qo\'shish xatosi')
				console.error('Savatga qo\'shish xatosi:', error.value)
				await syncFromBackend()
			}
		}

		const removeFromCart = async (productId) => {
			const item = items.value.find((cartItem) => cartItem.id === productId)
			if (!item) return

			if (item.quantity > 1) {
				await updateItemQuantity(productId, item.quantity - 1)
			} else {
				await deleteFromCart(productId)
			}
		}

		const deleteFromCart = async (productId) => {
			const item = items.value.find((cartItem) => cartItem.id === productId)
			items.value = items.value.filter((cartItem) => cartItem.id !== productId)

			if (!token.value || !item?.cartItemId) return

			try {
				await api.del(`/carts/remove/${item.cartItemId}`)
			} catch (e) {
				error.value = api.errorMessage(e, 'Savatdan o\'chirish xatosi')
				console.error('Savatdan o\'chirish xatosi:', error.value)
				await syncFromBackend()
			}
		}

		const updateItemQuantity = async (productId, quantity) => {
			const nextQuantity = Number(quantity)
			if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
				await deleteFromCart(productId)
				return
			}

			const item = items.value.find((cartItem) => cartItem.id === productId)
			if (!item) return

			item.quantity = nextQuantity
			if (!token.value || !item.cartItemId) return

			try {
				const res = await api.put(`/carts/update/${item.cartItemId}`, { quantity: nextQuantity })
				applyBackendCart(api.unwrap(res))
			} catch (e) {
				error.value = api.errorMessage(e, 'Savat yangilanmadi')
				console.error('Savat yangilanmadi:', error.value)
				await syncFromBackend()
			}
		}

		const clearLocalCart = () => {
			items.value = []
		}

		const clearCart = async () => {
			clearLocalCart()
			if (!token.value) return

			try {
				await api.del('/carts/clear')
			} catch (e) {
				error.value = api.errorMessage(e, 'Savat tozalanmadi')
				console.error('Savat tozalanmadi:', error.value)
				await syncFromBackend()
			}
		}

		return {
			items,
			totalPrice,
			loading,
			error,
			isInCart,
			getItemTotal,
			addToCart,
			removeFromCart,
			deleteFromCart,
			updateItemQuantity,
			clearCart,
			clearLocalCart,
			syncFromBackend
		}
	},
	{ persist: true }
)
