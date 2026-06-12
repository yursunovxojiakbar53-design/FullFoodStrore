<script setup>
const api = useApi()
const open = ref(false)
const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')
let searchTimer

const toggleSearch = () => {
	open.value = !open.value
}

const mapProduct = (product) => ({
	id: product.id,
	title: product.nameUz || product.name || '',
	description: product.descriptionUz || product.description || '',
	price: Number(product.currentPrice || product.discountPrice || product.price || 0)
})

const searchProducts = async () => {
	const productName = query.value.trim()
	if (productName.length < 2) {
		results.value = []
		error.value = ''
		return
	}

	loading.value = true
	error.value = ''
	try {
		const res = await api.get('/search/withProduct', {
			query: { productName, page: 0, size: 8 }
		})
		results.value = api.extractList(res).map(mapProduct)
	} catch (e) {
		results.value = []
		error.value = api.errorMessage(e, 'Qidirishda xatolik yuz berdi')
	} finally {
		loading.value = false
	}
}

watch(query, () => {
	clearTimeout(searchTimer)
	searchTimer = setTimeout(searchProducts, 300)
})

onUnmounted(() => {
	clearTimeout(searchTimer)
})

const selectProduct = () => {
	open.value = false
	navigateTo('/category')
}
</script>

<template>
	<div>
		<Button @click="toggleSearch" variant="outline" class="relative w-full h-8 rounded-none justify-start lg:rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 lg:w-56 xl:w-64">
			<span class="hidden lg:inline-flex">Mahsulotni qidirish...</span>
			<span class="inline-flex lg:hidden">Qidirish...</span>
			<kbd class="absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">Ctrl K</kbd>
		</Button>

		<CommandDialog v-model:open="open">
			<div class="p-3 border-b">
				<Input v-model="query" placeholder="Qidirish..." autofocus />
			</div>
			<CommandList>
				<CommandEmpty v-if="!loading && query.trim().length >= 2 && !results.length">
					Natija topilmadi.
				</CommandEmpty>
				<CommandGroup heading="Mahsulotlar">
					<CommandItem v-if="loading" value="loading" disabled>
						Yuklanmoqda...
					</CommandItem>
					<CommandItem
						v-for="product in results"
						:key="product.id"
						:value="product.title"
						@select="selectProduct"
					>
						<div class="flex w-full items-center justify-between gap-3">
							<span class="line-clamp-1">{{ product.title }}</span>
							<span class="text-xs text-muted-foreground whitespace-nowrap">{{ formatPrice(product.price) }} so'm</span>
						</div>
					</CommandItem>
				</CommandGroup>
				<p v-if="error" class="px-4 pb-3 text-sm text-red-500">{{ error }}</p>
			</CommandList>
		</CommandDialog>
	</div>
</template>
