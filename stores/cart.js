import { createPersistedState } from 'pinia-plugin-persistedstate'

export const useCartStore = defineStore(
	'cart',
	() => {
		const items = ref([])

		const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.out_price * item.quantity, 0))

		const isInCart = (id) => items.value.some((item) => item.id === id)

		const getItemTotal = (id) => {
			const item = items.value.find((item) => item.id === id)
			return item ? item.out_price * item.quantity : 0
		}

		const addToCart = (product) => {
			const item = items.value.find((item) => item.id === product.id)
			if (item) {
				item.quantity++
			} else {
				items.value.push({ ...product, quantity: 1 })
			}
		}

		const removeFromCart = (productId) => {
			const index = items.value.findIndex((item) => item.id === productId)
			if (index !== -1) {
				if (items.value[index].quantity > 1) {
					items.value[index].quantity--
				} else {
					items.value.splice(index, 1)
				}
			}
		}

		const updateItemQuantity = (productId, quantity) => {
			items.value = items.value.map((item) => (item.id === productId ? { ...item, quantity } : item))
		}

		const deleteFromCart = (productId) => {
			items.value = items.value.filter((item) => item.id !== productId)
		}

		const clearCart = () => {
			items.value = []
		}

		return {
			items,
			totalPrice,
			isInCart,
			getItemTotal,
			addToCart,
			removeFromCart,
			deleteFromCart,
			updateItemQuantity,
			clearCart
		}
	},
	{
		persist: {
			enabled: true
		}
	}
)
