<script setup>
import { Icon } from '@iconify/vue'

definePageMeta({
	layout: 'profile',
	middleware: 'auth'
})

const api = useApi()

// Bosqich ta'riflari
const STEP_DEFS = [
	{ title: 'Buyurtma qabul qilindi', desc: 'Buyurtmangiz tasdiqlandi' },
	{ title: "Jo'natishga tayyor", desc: 'Buyurtmangiz tayyorlanmoqda' },
	{ title: "Yo'lda", desc: 'Kuryer sizga olib kelmoqda' },
	{ title: 'Yetkazib berildi', desc: 'Buyurtmangiz yetkazildi' }
]

// Backend status -> tugagan bosqich indeksi
const STATUS_STAGE = {
	NEW: 0,
	PENDING: 0,
	CONFIRMED: 0,
	PROCESSING: 1,
	ON_THE_WAY: 2,
	DELIVERED: 3
}

const order = ref(null)
let timer = null

const fetchOrder = async () => {
	try {
		const res = await api.get('/api/v1/orders/my')
		const list = api.extractList(res)
		// Eng oxirgi buyurtma (id bo'yicha)
		order.value = list.length ? list.reduce((a, b) => (b.id > a.id ? b : a)) : null
	} catch {
		order.value = null
	}
}

onMounted(() => {
	fetchOrder()
	// Real vaqt his qilish uchun har 15s da yangilash (admin statusni o'zgartirsa ko'rinadi)
	timer = setInterval(fetchOrder, 15000)
})
onUnmounted(() => clearInterval(timer))

const formatTime = (d) => {
	try {
		return new Date(d).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
	} catch {
		return ''
	}
}

const canceled = computed(() => order.value?.orderStatus === 'CANCELED')
const completedIndex = computed(() => {
	if (!order.value || canceled.value) return -1
	return STATUS_STAGE[order.value.orderStatus] ?? 0
})

const steps = computed(() =>
	STEP_DEFS.map((d, i) => {
		let state = 'pending'
		if (order.value && !canceled.value) {
			if (i <= completedIndex.value) state = 'done'
			else if (i === completedIndex.value + 1) state = 'active'
		}
		return {
			...d,
			state,
			time: i === 0 && order.value?.createdAt ? formatTime(order.value.createdAt) : ''
		}
	})
)

// Kuryer faqat "Yo'lda" holatida ko'rinadi
const showCourier = computed(() => order.value?.orderStatus === 'ON_THE_WAY')

// Manzil (checkout'da kiritilgan — localStorage)
const lastOrder = ref(null)
onMounted(() => {
	try {
		const raw = localStorage.getItem('foodstore_last_order')
		if (raw) lastOrder.value = JSON.parse(raw)
	} catch {}
})
const deliveryAddress = computed(() => {
	const o = lastOrder.value
	if (!o) return 'Manzil kiritilmagan'
	if (o.deliverType === 'PICKUP') return [o.filialName, o.filialAddress].filter(Boolean).join(' — ') || 'Filialdan olib ketish'
	return o.address || 'Manzil kiritilmagan'
})
const addressLabel = computed(() => (lastOrder.value?.deliverType === 'PICKUP' ? 'Olib ketish filiali' : 'Yetkazib berish manzili'))
</script>

<template>
	<div>
		<!-- Sarlavha -->
		<div class="mb-6">
			<h1 class="text-2xl font-bold">Buyurtma holati</h1>
			<p class="mt-1 text-sm text-muted-foreground">Buyurtmangizni real vaqt rejimida kuzatish</p>
		</div>

		<!-- Buyurtma yo'q -->
		<div v-if="!order" class="mb-6 flex items-center gap-3 rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
			<Icon icon="ph:package-duotone" class="h-6 w-6" />
			Hozircha faol buyurtmangiz yo'q. Buyurtma berganingizdan so'ng holati shu yerda ko'rinadi.
		</div>
		<!-- Bekor qilingan -->
		<div v-else-if="canceled" class="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
			<Icon icon="ph:x-circle-duotone" class="h-6 w-6" />
			Bu buyurtma bekor qilingan.
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- CHAP: bosqichlar -->
			<div class="rounded-2xl border bg-card p-6 shadow-sm">
				<h2 class="mb-5 text-base font-bold">Buyurtma bosqichlari</h2>
				<div>
					<div v-for="(step, index) in steps" :key="index" class="relative flex gap-4 pb-6 last:pb-0">
						<div
							v-if="index < steps.length - 1"
							class="absolute left-[15px] top-9 h-[calc(100%-1.25rem)] w-0.5"
							:class="step.state === 'done' ? 'bg-green-500' : 'bg-muted'"
						></div>

						<div class="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full"
							:class="{
								'bg-green-500 text-white': step.state === 'done',
								'border-2 border-green-500 bg-green-50': step.state === 'active',
								'border-2 border-muted bg-card': step.state === 'pending'
							}">
							<Icon v-if="step.state === 'done'" icon="ph:check-bold" class="h-4 w-4" />
							<span v-else-if="step.state === 'active'" class="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500"></span>
							<span v-else class="h-2 w-2 rounded-full bg-muted-foreground/30"></span>
						</div>

						<div class="flex-1">
							<div class="flex items-center justify-between gap-2">
								<p class="font-semibold" :class="step.state === 'pending' ? 'text-muted-foreground' : 'text-foreground'">{{ step.title }}</p>
								<span v-if="step.time" class="text-xs text-muted-foreground">{{ step.time }}</span>
							</div>
							<p class="text-sm text-muted-foreground">{{ step.desc }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- O'NG: xarita -->
			<div class="relative min-h-[320px] overflow-hidden rounded-2xl border bg-gradient-to-br from-green-50 to-emerald-50">
				<svg class="absolute inset-0 h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="none">
					<path d="M70 260 C 150 210, 180 120, 330 75" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="9 9" stroke-linecap="round" />
				</svg>

				<div class="absolute bottom-6 left-6 flex flex-col items-center gap-1.5">
					<span class="grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white shadow-lg">
						<Icon icon="ph:storefront-duotone" class="h-6 w-6" />
					</span>
					<span class="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium shadow">Restoran</span>
				</div>

				<div class="absolute right-6 top-6 flex flex-col items-center gap-1.5">
					<Icon icon="ph:map-pin-fill" class="h-9 w-9 text-red-500 drop-shadow" />
					<span class="rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium shadow">Sizning manzilingiz</span>
				</div>

				<div v-if="showCourier" class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg">
					<span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
						<Icon icon="ph:moped-duotone" class="h-5 w-5" />
					</span>
					<div>
						<p class="text-xs font-semibold">Kuryer yaqinlashmoqda</p>
						<p class="text-xs text-muted-foreground">~15 daqiqa qoldi</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Pastki kartalar -->
		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			<div class="flex items-start gap-3 rounded-2xl border bg-amber-50/50 p-4">
				<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
					<Icon icon="ph:map-pin-duotone" class="h-5 w-5" />
				</span>
				<div>
					<p class="text-sm font-semibold">{{ addressLabel }}</p>
					<p class="text-sm text-muted-foreground">{{ deliveryAddress }}</p>
				</div>
			</div>
			<div class="flex items-start gap-3 rounded-2xl border bg-amber-50/50 p-4">
				<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
					<Icon icon="ph:clock-duotone" class="h-5 w-5" />
				</span>
				<div>
					<p class="text-sm font-semibold">Yetkazish vaqti</p>
					<p class="text-sm text-muted-foreground">40 daqiqa orasida yetkazamiz, <span class="font-medium text-primary">bepul</span></p>
				</div>
			</div>
		</div>
	</div>
</template>
