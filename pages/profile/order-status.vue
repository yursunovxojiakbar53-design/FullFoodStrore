<script setup>
import { Icon } from '@iconify/vue'

definePageMeta({
	layout: 'profile'
})

const orders = [
	{ status: 'Buyurtma qabul qilindi', description: 'Buyurtmangiz tasdiqlandi', icon: 'mdi:cart-check', active: true },
	{ status: 'Jo‘natishga tayyor', description: 'Buyurtmangiz tayyorlanmoqda', icon: 'mdi:package-variant-closed', active: false },
	{ status: 'Yo‘lda', description: 'Kuryer sizga olib kelmoqda', icon: 'mdi:truck-delivery', active: false },
	{ status: 'Yetkazib berildi', description: 'Buyurtmangiz yetkazildi', icon: 'mdi:check-circle', active: false }
]
</script>

<template>
	<div>
		<h1 class="section-title mb-6">Buyurtma holati</h1>
		<ul class="relative flex flex-col md:flex-row gap-2">
			<li v-for="(order, index) in orders" :key="index" class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
				<div class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
					<span class="size-10 flex justify-center items-center shrink-0 font-medium rounded-full" :class="order.active ? 'bg-primary text-white' : 'bg-muted'">
						<Icon :icon="order.icon" class="text-xl" />
					</span>
					<div class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-muted group-last:hidden"></div>
				</div>
				<div class="grow md:grow-0 md:mt-3 pb-5">
					<span class="block text-sm font-medium" :class="order.active ? 'text-primary' : ''"> {{ order.status }} </span>
					<p class="text-sm text-gray-500 dark:text-neutral-500">{{ order.description }}</p>
				</div>
			</li>
		</ul>
		<div class="mt-4 border border-dashed rounded-lg p-4">
			<div class="text-xl font-semibold">Yetkazib berish manzili</div>
			<div class="flex items-start gap-2 mt-4">
				<Icon icon="tdesign:location" class="flex-shrink-0 w-6 h-6" />
				<div>
					<div class="text-base font-medium">Sizning manzilingiz</div>
					<div class="text-sm">Toshkent sh., Shayxontohur tumani, Zargar ko'chasi, 5 uy (Tashkent City)</div>
					<div class="mt-4">
						<div class="text-sm">
							40 daqiqa orasida yetkazamiz,
							<span class="text-primary"> bepul </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
