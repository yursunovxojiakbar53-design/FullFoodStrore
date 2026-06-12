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
	<div class="mt-10">
		<h1 class="section-title mb-6">Filiallar</h1>

		<!-- Loading -->
		<div v-if="loading" class="flex flex-col gap-4">
			<div v-for="i in 3" :key="i" class="rounded-lg border bg-card p-6 max-w-[900px] animate-pulse">
				<div class="h-5 bg-muted rounded w-1/3 mb-3"></div>
				<div class="h-4 bg-muted rounded w-1/4"></div>
			</div>
		</div>

		<!-- Empty -->
		<div v-else-if="!filials.length" class="text-center py-16 text-muted-foreground">
			<p>Filiallar topilmadi</p>
		</div>

		<!-- Filials list -->
		<div v-else class="flex flex-col gap-4">
			<div
				v-for="filial in filials"
				:key="filial.id"
				class="rounded-lg border bg-card p-6 max-w-[900px]"
			>
				<div class="flex flex-col gap-3">
					<div class="flex-between items-start flex-wrap gap-2">
						<div>
							<h3 class="text-lg font-semibold text-foreground">{{ filial.title }}</h3>
							<p v-if="filial.description" class="text-sm text-muted-foreground">
								{{ filial.description }}
							</p>
						</div>
						<span
							v-if="filial.workHours"
							class="inline-flex gap-1.5 items-center text-sm"
							:class="isOpen(filial.workHours) ? 'text-green-500' : 'text-red-500'"
						>
              <span>🕐</span>
              {{ isOpen(filial.workHours) ? 'Ochiq' : 'Yopiq' }}
            </span>
					</div>

					<Separator />

					<div class="flex flex-wrap gap-6 text-sm">
						<div v-if="filial.workHours">
							<p class="text-muted-foreground mb-0.5">Ish vaqti</p>
							<p class="font-medium">{{ filial.workHours }}</p>
						</div>
						<div v-if="filial.phoneNumber">
							<p class="text-muted-foreground mb-0.5">Telefon</p>
							<a :href="`tel:${filial.phoneNumber}`" class="font-medium hover:underline text-primary">
								{{ filial.phoneNumber }}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
