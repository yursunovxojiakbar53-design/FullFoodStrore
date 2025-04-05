<script setup>
const activeCategory = ref(null)
const scrollToCategory = (categoryId) => {
	const section = document.getElementById(categoryId)
	if (section) {
		section.scrollIntoView()
		activeCategory.value = categoryId
	}
}

const handleScroll = () => {
	let currentActive = null
	categories.forEach((item) => {
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

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
	handleScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
	<div class="mt-10">
		<div class="border-grid sticky top-0 h-14 z-50 w-full flex items-center bg-background">
			<div class="relative overflow-x-auto w-full no-scrollbar">
				<nav class="flex gap-4">
					<Button v-for="item in categories" :key="item.id" :variant="activeCategory === item.title.uz ? '' : 'outline'" @click="scrollToCategory(item.title.uz)">
						<a :href="'#' + item.title.uz">{{ item.title.uz }}</a>
					</Button>
				</nav>
			</div>
		</div>

		<div class="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_350px]">
			<section>
				<div v-for="item in categories" :key="item.id" :id="item.title.uz" class="pt-14 -mt-6">
					<h2 class="text-xl sm:text-2xl font-bold mb-6">{{ item.title.uz }}</h2>
					<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<CardProduct v-for="product in item.products" :key="product.id" :product="product" />
					</div>
				</div>
			</section>
			<MainCart />
		</div>
	</div>
</template>
