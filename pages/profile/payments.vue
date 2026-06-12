<script setup>
definePageMeta({ layout: 'profile', middleware: 'auth' })

const api = useApi()
const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const payments = ref([])
const loading = ref(true)

const paymentStatusLabel = (status) => {
	const map = {
		PAID: "To'langan",
		PENDING: 'Kutilmoqda',
		FAILED: 'Xato',
		CANCELLED: 'Bekor qilingan'
	}
	return map[status] || status || '—'
}

const paymentStatusClass = (status) => {
	if (status === 'PAID') return 'text-green-500'
	if (status === 'PENDING') return 'text-yellow-500'
	return 'text-red-500'
}

onMounted(async () => {
	if (!orders.value.length) {
		await orderStore.fetchMyOrders()
	}
	// Har bir buyurtma uchun to'lov ma'lumotini olish
	const results = []
	for (const order of orders.value) {
		try {
			const res = await api.get(`/payments/order/${order.id}`)
			const p = api.unwrap(res)
			if (p) results.push({ ...p, orderId: order.id })
		} catch {
			// payment not found for this order
		}
	}
	payments.value = results
	loading.value = false
})
</script>

<template>
	<div>
		<h1 class="section-title mb-6">To'lovlar</h1>

		<div v-if="loading" class="flex flex-col gap-2">
			<div v-for="i in 3" :key="i" class="h-10 bg-muted rounded animate-pulse"></div>
		</div>

		<div v-else-if="!payments.length" class="text-center py-16 text-muted-foreground">
			<p>To'lovlar topilmadi</p>
		</div>

		<div v-else class="border overflow-x-auto rounded-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead class="p-4">Buyurtma ID</TableHead>
						<TableHead class="p-4">To'lov turi</TableHead>
						<TableHead class="p-4">Summa</TableHead>
						<TableHead class="p-4">Holat</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="payment in payments" :key="payment.id" class="odd:bg-muted/50">
						<TableCell class="p-4">#{{ payment.orderId }}</TableCell>
						<TableCell class="p-4">{{ payment.paymentType || payment.type || '—' }}</TableCell>
						<TableCell class="p-4">{{ (payment.amount || 0).toLocaleString() }} so'm</TableCell>
						<TableCell class="p-4">
							<span :class="paymentStatusClass(payment.status)">
								{{ paymentStatusLabel(payment.status) }}
							</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	</div>
</template>
