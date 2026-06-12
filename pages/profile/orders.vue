<script setup>
definePageMeta({ layout: 'profile', middleware: 'auth' })

const orderStore = useOrderStore()
const { orders, loading } = storeToRefs(orderStore)

onMounted(() => {
	orderStore.fetchMyOrders()
})

const statusLabel = (status) => {
	const map = {
		NEW: 'Yangi',
		PENDING: 'Kutilmoqda',
		CONFIRMED: 'Tasdiqlangan',
		ON_THE_WAY: "Yo'lda",
		DELIVERED: 'Yetkazildi',
		CANCELED: 'Bekor qilingan'
	}
	return map[status] || status || '—'
}

const statusClass = (status) => {
	if (status === 'DELIVERED') return '!bg-green-500 text-white'
	if (status === 'CANCELED') return '!bg-red-500 text-white'
	if (status === 'ON_THE_WAY') return '!bg-blue-500 text-white'
	if (status === 'CONFIRMED') return '!bg-indigo-500 text-white'
	if (status === 'PENDING') return '!bg-yellow-500 text-white'
	return '!bg-card-foreground text-accent'
}

const formatDate = (dateStr) => {
	if (!dateStr) return '—'
	return new Date(dateStr).toLocaleString('uz-UZ', {
		year: 'numeric', month: 'long', day: 'numeric',
		hour: '2-digit', minute: '2-digit'
	})
}
</script>

<template>
	<div>
		<h1 class="section-title mb-6">Buyurtmalar tarixi</h1>

		<div v-if="loading" class="flex flex-col gap-4">
			<div v-for="i in 3" :key="i" class="border border-dashed rounded-lg p-4 animate-pulse">
				<div class="h-5 bg-muted rounded w-1/3 mb-3"></div>
				<div class="h-4 bg-muted rounded w-1/4"></div>
			</div>
		</div>

		<div v-else-if="!orders.length" class="text-center py-16 text-muted-foreground">
			<p class="text-lg mb-4">Hozircha buyurtmalar yo'q</p>
			<NuxtLink to="/">
				<Button>Menyu</Button>
			</NuxtLink>
		</div>

		<div v-else class="flex flex-col gap-6">
			<article class="border border-dashed rounded-lg" v-for="order in orders" :key="order.id">
				<header class="flex-center-between min-h-12 px-4 border-b border-dashed">
					<p class="text-lg font-medium">
						Buyurtma #<span>{{ order.id }}</span>
					</p>
					<Badge :class="statusClass(order.orderStatus)">{{ statusLabel(order.orderStatus) }}</Badge>
				</header>

				<div class="p-4 flex flex-col gap-4">
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Buyurtma sanasi:</span>
						<span>{{ formatDate(order.createdAt || order.orderDate) }}</span>
					</div>

					<div v-if="order.address?.title || order.addressTitle" class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Manzil:</span>
						<span>{{ order.address?.title || order.addressTitle }}</span>
					</div>

					<div v-if="order.filial?.title || order.filialTitle" class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Filial:</span>
						<span>{{ order.filial?.title || order.filialTitle }}</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">To'lov turi:</span>
						<span>{{ order.paymentType === 'CASH' ? 'Naqd pul' : 'Karta' }}</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Buyurtma qiymati:</span>
						<span class="font-semibold">{{ (order.totalPrice || 0).toLocaleString() }} so'm</span>
					</div>
				</div>

				<footer v-if="order.items?.length" class="px-4 border-t border-dashed">
					<Accordion type="single" collapsible>
						<AccordionItem value="items">
							<AccordionTrigger>{{ order.items.length }} ta mahsulot</AccordionTrigger>
							<AccordionContent>
								<p class="text-base text-muted-foreground mb-2">Buyurtma ro'yxati</p>
								<ul class="flex flex-col gap-4">
									<li class="flex gap-2 items-center" v-for="item in order.items" :key="item.productId || item.id">
										<div class="flex flex-col lg:flex-row lg:justify-between gap-0.5 w-full">
											<h4 class="text-base">{{ item.productName || item.name }} — {{ item.quantity }} dona</h4>
											<p class="font-semibold text-base">{{ ((item.price || item.productPrice || 0) * item.quantity).toLocaleString() }} so'm</p>
										</div>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</footer>
			</article>
		</div>
	</div>
</template>
