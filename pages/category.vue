<script setup>
const categoriesStore = useCategoriesStore()
const { categories, loading } = storeToRefs(categoriesStore)

onMounted(async () => {
	if (!categories.value.length) {
		await categoriesStore.fetchCategories()
	}
})
</script>

<template>
	<div class="">
		<div class="border-dashed flex-1 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 md:gap-6">
			<aside class="sticky top-20 pb-6 pt-4 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
				<ScrollArea class="lg:border-r border-dashed relative h-full overflow-hidden pb-12 pr-6 text-sm md:pr-4">
					<div v-if="loading" class="flex flex-col gap-2">
						<div v-for="i in 6" :key="i" class="h-8 bg-muted rounded animate-pulse"></div>
					</div>
					<ul v-else class="flex flex-col gap-1">
						<li v-for="item in categories" :key="item.id">
							<NuxtLink to="/category" class="h-8 flex items-center gap-2 rounded-md hover:bg-muted p-2 text-sm text-foreground/80 hover:text-primary">
								{{ item.title.uz }}
							</NuxtLink>
						</li>
					</ul>
				</ScrollArea>
			</aside>
			<main class="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_350px]">
				<div class="pt-10">
					<div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<div v-for="i in 6" :key="i" class="rounded-xl bg-muted animate-pulse aspect-square"></div>
					</div>
					<div v-else v-for="cat in categories" :key="cat.id" class="mb-10">
						<h2 class="text-xl sm:text-2xl font-bold mb-6">{{ cat.title.uz }}</h2>
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
							<CardProduct v-for="product in cat.products" :key="product.id" :product="product" />
						</div>
					</div>
				</div>
				<MainCart />
			</main>
		</div>
	</div>
</template>
