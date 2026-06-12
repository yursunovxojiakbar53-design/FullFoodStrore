export const useOrderStore = defineStore('orderStore', () => {
	const api = useApi()
	const orders = ref([])
	const loading = ref(false)
	const error = ref(null)

	const fetchMyOrders = async () => {
		if (!api.token.value) return
		loading.value = true
		error.value = null

		try {
			const res = await api.get('/orders/my')
			orders.value = api.extractList(res)
		} catch (e) {
			error.value = api.errorMessage(e, 'Buyurtmalar yuklanmadi')
		} finally {
			loading.value = false
		}
	}

	const createOrder = async (orderData) => {
		if (!api.token.value) return { success: false, message: 'Avval tizimga kiring' }
		loading.value = true
		error.value = null

		try {
			const res = await api.post('/orders', orderData)
			if (res.status) {
				await fetchMyOrders()
				return { success: true, data: api.unwrap(res) }
			}

			error.value = res.message
			return { success: false, message: res.message }
		} catch (e) {
			error.value = api.errorMessage(e, 'Buyurtma xatosi')
			return { success: false, message: error.value }
		} finally {
			loading.value = false
		}
	}

	return { orders, loading, error, fetchMyOrders, createOrder }
})
