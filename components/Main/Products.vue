<script setup>
const categoriesStore = useCategoriesStore()
const { categories, loading, authError, error } = storeToRefs(categoriesStore)

const activeCategory = ref(null)

onMounted(async () => {
	await categoriesStore.fetchCategories()
	window.addEventListener('scroll', handleScroll)
	handleScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})

const scrollToCategory = (categoryId) => {
	const section = document.getElementById(categoryId)
	if (section) {
		section.scrollIntoView()
		activeCategory.value = categoryId
	}
}

const handleScroll = () => {
	let currentActive = null
	categories.value.forEach((item) => {
		const section = document.getElementById(item.title.uz)
		if (section) {
			const rect = section.getBoundingClientRect()
			if (rect.top <= 100 && rect.bottom >= 100) {
				currentActive = item.title.uz
			}
		}
	})
	if (currentActive !== activeCategory.value) {
		activeCategory.value = currentActive
	}
}

</script>

<template>
	<div class="mt-10">

		<!-- Loading -->
		<div v-if="loading" class="flex justify-center py-10">
			<span>Yuklanmoqda...</span>
		</div>

		<!-- Backend load error -->
		<div v-else-if="authError || error" class="py-20 flex flex-col items-center gap-4 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground">
				<circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
			</svg>
			<p class="text-xl font-semibold">Menyu yuklanmadi</p>
			<p class="text-sm text-muted-foreground">{{ error || 'Backend bilan bog\'lanishda xatolik yuz berdi.' }}</p>
			<Button class="mt-2 px-8" @click="categoriesStore.fetchCategories()">Qayta yuklash</Button>
		</div>

		<div v-else-if="!categories.length" class="py-16 text-center text-muted-foreground">
			<p class="text-lg">Mahsulotlar yuklanmadi.</p>
			<p class="text-sm mt-2">Sahifani yangilang yoki qaytadan kiring.</p>
			<Button class="mt-4" @click="categoriesStore.fetchCategories()">Qayta yuklash</Button>
		</div>

		<div v-else>
			<!-- Kategoriya navigatsiya -->
			<div class="border-grid sticky top-0 h-14 z-50 w-full flex items-center bg-background">
				<div class="relative overflow-x-auto w-full no-scrollbar">
					<nav class="flex gap-4">
						<Button
							v-for="item in categories"
							:key="item.id"
							:variant="activeCategory === item.title.uz ? '' : 'outline'"
							@click="scrollToCategory(item.title.uz)">
							<a :href="'#' + item.title.uz">{{ item.title.uz }}</a>
						</Button>
					</nav>
				</div>
			</div>

			<!-- Mahsulotlar -->
			<div class="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_350px]">
				<section>
					<div v-for="item in categories" :key="item.id" :id="item.title.uz" class="pt-14 -mt-6">
						<h2 class="text-xl sm:text-2xl font-bold mb-6">{{ item.title.uz }}</h2>
						<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							<CardProduct
								v-for="product in item.products"
								:key="product.id"
								:product="product" />
						</div>
					</div>
				</section>
				<MainCart />
			</div>
		</div>

	</div>
</template>
