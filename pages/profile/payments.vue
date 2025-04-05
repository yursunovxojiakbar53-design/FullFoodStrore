<script setup>
definePageMeta({
	layout: 'profile'
})

const payments = ref([
	{ id: 1, type: 'Payme', amount: 250000, status: "to'langan" },
	{ id: 2, type: 'Click', amount: 150000, status: 'kutilmoqda' },
	{ id: 3, type: 'Visa', amount: 300000, status: 'bekor qilingan' }
])
</script>

<template>
	<div>
		<h1 class="section-title mb-6">To'lovlar</h1>
		<div class="border overflow-x-auto rounded-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead class="p-4">ID</TableHead>
						<TableHead class="p-4">To'lov turi</TableHead>
						<TableHead class="p-4">Summa</TableHead>
						<TableHead class="p-4">Holat</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="payment in payments" :key="payment.id" class="odd:bg-muted/50">
						<TableCell class="p-4">{{ payment.id }}</TableCell>
						<TableCell class="p-4">{{ payment.type }}</TableCell>
						<TableCell class="p-4">{{ payment.amount.toLocaleString() }} so'm</TableCell>
						<TableCell class="p-4">
							<span
								:class="{
									'text-green-500': payment.status === 'to\'langan',
									'text-yellow-500': payment.status === 'kutilmoqda',
									'text-red-500': payment.status === 'bekor qilingan'
								}"
							>
								{{ payment.status }}
							</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	</div>
</template>
