<script setup>
const api = useApi()
const filials = ref([])
const loading = ref(true)

onMounted(async () => {
	try {
		const res = await api.get('/api/filials')
		filials.value = api.extractList(res)
	} catch (e) {
		console.error('Filiallar yuklanmadi:', api.errorMessage(e))
	} finally {
		loading.value = false
	}
})

const isOpen = (workHours) => {
	if (!workHours) return null
	const now = new Date()
	const h = now.getHours()
	return h >= 10 && h < 23
}
</script>

<template>
	<div class="py-10">
		<!-- Sarlavha -->
		<div>
			<h1 class="font-serif text-4xl font-bold">Filiallar</h1>
			<div class="mt-2 h-1 w-20 rounded bg-gradient-to-r from-amber-400 to-yellow-600"></div>
			<p class="mt-3 text-muted-foreground">Barcha filiallar ro'yxati va aloqa ma'lumotlari</p>
		</div>

		<!-- Loading -->
		<div v-if="loading" class="mt-8 flex flex-col gap-5">
			<div v-for="i in 3" :key="i" class="h-44 animate-pulse rounded-2xl border bg-card"></div>
		</div>

		<!-- Empty -->
		<div v-else-if="!filials.length" class="py-20 text-center text-muted-foreground">
			Filiallar topilmadi
		</div>

		<!-- Ro'yxat -->
		<div v-else class="mt-8 flex flex-col gap-5">
			<div
				v-for="(filial, index) in filials"
				:key="filial.id"
				class="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6"
			>
				<div class="flex flex-col gap-5 sm:flex-row">
					<!-- Chap: raqam + ikonka -->
					<div class="relative flex shrink-0 items-center justify-center rounded-xl bg-amber-50 p-6 sm:w-44">
						<span class="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-amber-300 bg-white text-xs font-bold text-amber-600">
							{{ String(index + 1).padStart(2, '0') }}
						</span>
						<span class="grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
								<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
								<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
								<path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
							</svg>
						</span>
					</div>

					<!-- O'ng: ma'lumotlar -->
					<div class="flex flex-1 flex-col">
						<div class="flex items-start justify-between gap-3">
							<div>
								<h3 class="font-serif text-xl font-bold">{{ filial.title }}</h3>
								<p v-if="filial.description" class="mt-0.5 text-sm text-muted-foreground">{{ filial.description }}</p>
							</div>
							<span
								class="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
								:class="isOpen(filial.workHours) ? 'border-green-200 bg-green-50 text-green-600' : 'border-red-200 bg-red-50 text-red-600'"
							>
								<span class="h-1.5 w-1.5 rounded-full" :class="isOpen(filial.workHours) ? 'bg-green-500' : 'bg-red-500'"></span>
								{{ isOpen(filial.workHours) ? 'Ochiq' : 'Yopiq' }}
							</span>
						</div>

						<div class="my-4 border-t border-dashed border-amber-200"></div>

						<div class="flex flex-wrap items-center gap-6">
							<div v-if="filial.workHours" class="flex items-center gap-3">
								<span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-50 text-amber-600">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
								</span>
								<div>
									<p class="text-xs text-muted-foreground">Ish vaqti</p>
									<p class="text-sm font-medium">Har kuni {{ filial.workHours }}</p>
								</div>
							</div>
							<div v-if="filial.phoneNumber" class="flex items-center gap-3">
								<span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-50 text-amber-600">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
								</span>
								<div>
									<p class="text-xs text-muted-foreground">Telefon</p>
									<a :href="`tel:${filial.phoneNumber}`" class="text-sm font-medium text-primary hover:underline">{{ filial.phoneNumber }}</a>
								</div>
							</div>
							<a
								v-if="filial.phoneNumber"
								:href="`tel:${filial.phoneNumber}`"
								class="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber-300 text-amber-600 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
