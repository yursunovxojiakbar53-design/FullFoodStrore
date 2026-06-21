<script setup>
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

definePageMeta({
	layout: 'profile',
	middleware: 'auth'
})

const wishlist = useWishlistStore()
const cart = useCartStore()
const { foodImage } = useFoodImages()

onMounted(() => wishlist.fetch())

const productName = (p) => p?.nameUz || p?.title?.uz || p?.name || 'Mahsulot'
const productDesc = (p) => p?.descriptionUz || p?.description?.uz || ''
const productPrice = (p) => Number(p?.currentPrice || p?.out_price || p?.price || 0)

const addToCart = (p) => {
	cart.addToCart({
		id: p.id,
		title: { uz: productName(p) },
		description: { uz: productDesc(p) },
		out_price: productPrice(p),
		currency: "so'm",
		image: p?.attachment?.id || p?.image || null
	})
}

const clearAll = () => {
	if (confirm("Barcha sevimlilarni o'chirishni tasdiqlaysizmi?")) wishlist.clear()
}
</script>

<template>
	<div>
		<!-- Sarlavha -->
		<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
					<Icon icon="ph:heart-duotone" class="h-6 w-6" />
				</span>
				<div>
					<h1 class="text-2xl font-bold">Sevimlilar</h1>
					<p class="text-sm text-muted-foreground">Sevimligingizga qo'shgan taomlaringiz</p>
				</div>
			</div>
			<button
				v-if="wishlist.items.length"
				type="button"
				class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-destructive transition hover:bg-destructive/10"
				@click="clearAll"
			>
				<Icon icon="ph:trash-duotone" class="h-4 w-4" />
				Barchasini tozalash
			</button>
		</div>

		<!-- Loading -->
		<div v-if="wishlist.loading" class="flex flex-col gap-3">
			<div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-2xl border bg-card"></div>
		</div>

		<!-- Empty -->
		<div v-else-if="!wishlist.items.length" class="flex flex-col items-center gap-3 rounded-2xl border bg-card py-16 text-center">
			<Icon icon="ph:heart-break-duotone" class="h-12 w-12 text-muted-foreground" />
			<p class="text-lg font-semibold">Sevimlilar ro'yxati bo'sh</p>
			<p class="text-sm text-muted-foreground">Mahsulot ustidagi yurakcha belgisini bosib, sevimlilarga qo'shing</p>
			<NuxtLink to="/" class="mt-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Menyuga o'tish</NuxtLink>
		</div>

		<!-- List -->
		<div v-else class="flex flex-col gap-3">
			<div
				v-for="entry in wishlist.items"
				:key="entry.id"
				class="flex items-center gap-4 rounded-2xl border bg-card p-3 shadow-sm transition hover:shadow-md"
			>
				<div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
					<CommonImage class="h-full w-full" :src="foodImage(entry.product)" :alt="productName(entry.product)" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="truncate font-semibold">{{ productName(entry.product) }}</h3>
					<p class="truncate text-sm text-muted-foreground">{{ productDesc(entry.product) || '—' }}</p>
				</div>
				<p class="shrink-0 font-bold">{{ formatPrice(productPrice(entry.product)) }} so'm</p>
				<button
					type="button"
					class="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
					@click="addToCart(entry.product)"
				>
					Savatchaga
					<Icon icon="ph:plus-bold" class="h-4 w-4" />
				</button>
				<button
					type="button"
					class="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
					aria-label="O'chirish"
					@click="wishlist.remove(entry.product.id)"
				>
					<Icon icon="ph:x-bold" class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
</template>
