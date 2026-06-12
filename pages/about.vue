<script setup>
const api = useApi()
const aboutContent = ref(null)
const loading = ref(true)

onMounted(async () => {
	try {
		const res = await api.get('/open/about')
		const data = api.unwrap(res)
		aboutContent.value = Array.isArray(data) ? data[0] : data
	} catch {
		// fallback to static content if endpoint fails
	} finally {
		loading.value = false
	}
})
</script>

<template>
	<div class="mt-10">
		<h1 class="section-title">Biz haqimizda</h1>
		<div class="aspect-video mt-4 rounded-lg relative overflow-hidden max-sm:rounded-none">
			<img src="/images/image.png" class="w-full h-full object-cover" />
		</div>

		<div v-if="loading" class="mt-4 space-y-2">
			<div class="h-4 bg-muted rounded animate-pulse w-full"></div>
			<div class="h-4 bg-muted rounded animate-pulse w-3/4"></div>
			<div class="h-4 bg-muted rounded animate-pulse w-5/6"></div>
		</div>

		<div v-else-if="aboutContent" class="mt-4 whitespace-pre-line">
			{{ aboutContent.description || aboutContent.content || aboutContent.text || '' }}
		</div>

		<p v-else class="mt-4">
			Marvarid restorani 2010-yilda Toshkent shahrida tashkil etilgan.<br /><br />
			Hozirgi kunda Marvarid restorani o'zining shinam muhitida milliy va xalqaro taomlarni mehmonlarga taqdim etadi.<br /><br />
			Restoran menyusida quyidagi asosiy taomlar mavjud:<br /><br />
			- O'zbek milliy taomlari (osh, manti, somsa, shashlik) - Yevropa taomlari - Dengiz mahsulotlari - Shirinliklar va desertlar - Turli ichimliklar<br /><br />
			Marvarid restorani mehmonlarga yuqori sifatli xizmat va betakror ta'mga ega taomlar bilan xizmat ko'rsatadi.
		</p>
	</div>
</template>
