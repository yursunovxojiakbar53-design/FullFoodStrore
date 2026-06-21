<script setup>
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const categoriesStore = useCategoriesStore()
const { categories, loading } = storeToRefs(categoriesStore)
const cart = useCartStore()
const wishlist = useWishlistStore()
const { foodImage } = useFoodImages()

const activeId = ref(null)
const sortBy = ref('default')
const view = ref('grid')

// Saralash dropdown (custom — premium)
const sortOptions = [
	{ value: 'default', label: 'Dastlabki tartib' },
	{ value: 'price-asc', label: 'Narx: arzondan qimmatga' },
	{ value: 'price-desc', label: 'Narx: qimmatdan arzonga' },
	{ value: 'name', label: "Nomi bo'yicha (A–Z)" }
]
const sortOpen = ref(false)
const sortRef = ref(null)
const currentSortLabel = computed(() => sortOptions.find((o) => o.value === sortBy.value)?.label || 'Saralash')
const selectSort = (v) => {
	sortBy.value = v
	sortOpen.value = false
}
onClickOutside(sortRef, () => (sortOpen.value = false))

onMounted(async () => {
	if (!categories.value.length) await categoriesStore.fetchCategories()
	wishlist.ensureLoaded()
})

// Kategoriyalar yuklangach birinchisini tanlash
watchEffect(() => {
	if (categories.value.length && (activeId.value == null || !categories.value.some((c) => c.id === activeId.value))) {
		activeId.value = categories.value[0].id
	}
})

const catIcon = (cat) => {
	const n = (cat?.title?.uz || '').toLowerCase()
	if (n.includes('pitsa') || n.includes('pizza')) return '🍕'
	if (n.includes('burger')) return '🍔'
	if (n.includes('sushi')) return '🍣'
	if (n.includes('ichim') || n.includes('drink') || n.includes('napit')) return '🥤'
	if (n.includes('shirin') || n.includes('dessert') || n.includes('desert')) return '🍰'
	if (n.includes('salat') || n.includes('salad')) return '🥗'
	if (n.includes('lavash') || n.includes('shaurma') || n.includes('shawarma')) return '🌯'
	return '🍽️'
}

const activeCategory = computed(() => categories.value.find((c) => c.id === activeId.value) || categories.value[0] || null)

const sortedProducts = computed(() => {
	const list = [...(activeCategory.value?.products || [])]
	if (sortBy.value === 'price-asc') list.sort((a, b) => a.out_price - b.out_price)
	else if (sortBy.value === 'price-desc') list.sort((a, b) => b.out_price - a.out_price)
	else if (sortBy.value === 'name') list.sort((a, b) => (a.title?.uz || '').localeCompare(b.title?.uz || ''))
	return list
})

const addToCart = (p) => cart.addToCart(p)
</script>

<template>
	<div class="py-6">
		<!-- Breadcrumb -->
		<nav class="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
			<NuxtLink to="/" class="transition hover:text-foreground">Bosh sahifa</NuxtLink>
			<Icon icon="ph:caret-right" class="h-3.5 w-3.5" />
			<span>Kategoriyalar</span>
			<Icon icon="ph:caret-right" class="h-3.5 w-3.5" />
			<span class="font-medium text-foreground">{{ activeCategory?.title?.uz || '...' }}</span>
		</nav>

		<div class="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)_340px]">
			<!-- ── CHAP: kategoriyalar + promo ───────────────────────── -->
			<aside class="space-y-5">
				<div class="rounded-2xl border bg-card p-2 shadow-sm">
					<button
						v-for="cat in categories"
						:key="cat.id"
						class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition"
						:class="activeId === cat.id ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted'"
						@click="activeId = cat.id"
					>
						<span class="text-lg leading-none">{{ catIcon(cat) }}</span>
						<span class="truncate">{{ cat.title.uz }}</span>
					</button>
					<div v-if="loading && !categories.length" class="space-y-2 p-1">
						<div v-for="i in 4" :key="i" class="h-9 animate-pulse rounded-xl bg-muted"></div>
					</div>
				</div>

				<!-- Promo -->
				<div class="overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-50 to-purple-100 p-5 text-center">
					<p class="text-sm font-bold text-purple-900">Tez va mazali yetkazib berish!</p>
					<p class="mt-1 text-xs text-purple-700/70">Sevimli taomlaringizni eshigingizgacha yetkazamiz.</p>
					<div class="mt-3 text-6xl leading-none drop-shadow-sm">🛵</div>
				</div>
			</aside>

			<!-- ── MARKAZ: mahsulotlar ───────────────────────────────── -->
			<main class="min-w-0">
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{{ activeCategory?.title?.uz || 'Mahsulotlar' }}</h1>
					<p class="mt-1 text-sm text-muted-foreground">
						{{ activeCategory?.description?.uz || 'Mazali va yangi ingredientlardan tayyorlangan taomlar' }}
					</p>
				</div>

				<!-- Toolbar -->
				<div class="mt-5 flex items-center justify-between gap-3">
					<div ref="sortRef" class="relative">
						<button
							type="button"
							class="flex h-11 items-center gap-2 rounded-xl border bg-card px-3 text-sm font-medium shadow-sm transition hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
							@click="sortOpen = !sortOpen"
						>
							<Icon icon="ph:sliders-horizontal-bold" class="h-4 w-4 text-amber-500" />
							<span>{{ currentSortLabel }}</span>
							<Icon icon="ph:caret-down-bold" class="h-4 w-4 text-muted-foreground transition-transform" :class="sortOpen ? 'rotate-180' : ''" />
						</button>

						<Transition
							enter-active-class="transition duration-150 ease-out"
							enter-from-class="opacity-0 -translate-y-1"
							enter-to-class="opacity-100 translate-y-0"
							leave-active-class="transition duration-100 ease-in"
							leave-from-class="opacity-100 translate-y-0"
							leave-to-class="opacity-0 -translate-y-1"
						>
							<div v-if="sortOpen" class="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border bg-card p-1 shadow-xl">
								<button
									v-for="opt in sortOptions"
									:key="opt.value"
									type="button"
									class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition"
									:class="sortBy === opt.value ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-muted'"
									@click="selectSort(opt.value)"
								>
									<span>{{ opt.label }}</span>
									<Icon v-if="sortBy === opt.value" icon="ph:check-bold" class="h-4 w-4" />
								</button>
							</div>
						</Transition>
					</div>
					<div class="flex items-center gap-1 rounded-lg border p-1">
						<button class="grid h-8 w-8 place-items-center rounded-md transition" :class="view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'" @click="view = 'grid'">
							<Icon icon="ph:squares-four-bold" class="h-4 w-4" />
						</button>
						<button class="grid h-8 w-8 place-items-center rounded-md transition" :class="view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'" @click="view = 'list'">
							<Icon icon="ph:list-bold" class="h-4 w-4" />
						</button>
					</div>
				</div>

				<!-- Loading -->
				<div v-if="loading" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div v-for="i in 6" :key="i" class="aspect-[3/4] animate-pulse rounded-xl bg-muted"></div>
				</div>

				<!-- Empty -->
				<div v-else-if="!sortedProducts.length" class="mt-5 rounded-2xl border bg-card py-16 text-center text-muted-foreground">
					Bu kategoriyada mahsulotlar yo'q
				</div>

				<!-- Grid view -->
				<div v-else-if="view === 'grid'" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<CardProduct v-for="p in sortedProducts" :key="p.id" :product="p" />
				</div>

				<!-- List view -->
				<div v-else class="mt-5 flex flex-col gap-4">
					<div v-for="p in sortedProducts" :key="p.id" class="flex items-center gap-4 rounded-2xl border bg-card p-3 shadow-sm transition hover:shadow-md">
						<div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
							<CommonImage class="h-full w-full" :src="foodImage(p)" :alt="p.title?.uz" />
							<button
								type="button"
								class="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow"
								@click.stop="wishlist.toggle(p)"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
									:class="wishlist.isFavorite(p.id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-500'">
									<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
								</svg>
							</button>
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="truncate font-semibold">{{ p.title?.uz }}</h3>
							<p class="truncate text-sm text-muted-foreground">{{ p.description?.uz || '—' }}</p>
							<div class="mt-1 flex items-center gap-2">
								<span v-if="p.discountPrice" class="text-xs text-muted-foreground line-through">{{ formatPrice(p.discountPrice) }} so'm</span>
								<span class="font-bold">{{ formatPrice(p.out_price) }} so'm</span>
							</div>
						</div>
						<Button class="shrink-0 rounded-xl" @click="addToCart(p)">
							Savatga qo'shish
							<Icon icon="ph:plus-bold" class="ml-1 h-4 w-4" />
						</Button>
					</div>
				</div>
			</main>

			<!-- ── O'NG: savatcha ────────────────────────────────────── -->
			<aside class="hidden xl:block">
				<div class="sticky top-20 rounded-2xl border bg-card shadow-sm">
					<div class="flex items-center justify-between border-b p-4">
						<h3 class="font-bold">Savatcha</h3>
						<button v-if="cart.items.length" type="button" class="text-sm text-muted-foreground transition hover:text-destructive" @click="cart.clearCart()">Tozalash</button>
					</div>

					<div class="no-scrollbar max-h-[calc(100vh-18rem)] overflow-y-auto">
						<!-- Bo'sh -->
						<div v-if="!cart.items.length" class="flex flex-col items-center gap-2 px-4 py-14 text-center">
							<Icon icon="ph:basket-duotone" class="h-12 w-12 text-muted-foreground/40" />
							<p class="font-semibold">Hozircha savatingiz bo'sh</p>
							<p class="text-xs text-muted-foreground">Sevimli taomlaringizni tanlang va savatchangizga qo'shing.</p>
						</div>

						<!-- Itemlar -->
						<div v-else>
							<div v-for="item in cart.items" :key="item.id" class="flex items-center gap-3 border-b p-3 last:border-0">
								<div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
									<CommonImage class="h-full w-full" :src="foodImage(item)" :alt="item.title?.uz" />
								</div>
								<div class="min-w-0 flex-1">
									<p class="truncate text-sm font-medium">{{ item.title?.uz || item.title }}</p>
									<p class="text-xs text-muted-foreground">{{ formatPrice(item.out_price) }} so'm × {{ item.quantity }}</p>
								</div>
								<button type="button" class="shrink-0 text-muted-foreground transition hover:text-destructive" @click="cart.deleteFromCart(item.id)">
									<Icon icon="ph:trash-duotone" class="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>

					<div class="border-t p-4">
						<div class="mb-3 flex items-center justify-between text-sm">
							<span class="text-muted-foreground">Jami</span>
							<span class="font-bold">{{ formatPrice(cart.totalPrice) }} so'm</span>
						</div>
						<NuxtLink :to="cart.items.length ? '/cart/checkout' : '/'">
							<button class="flex w-full items-center justify-between rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
								<span>{{ cart.items.length ? 'Buyurtma berish' : 'Menyuga o\'tish' }}</span>
								<span>{{ formatPrice(cart.totalPrice) }} so'm</span>
							</button>
						</NuxtLink>
					</div>
				</div>
			</aside>
		</div>
	</div>
</template>
