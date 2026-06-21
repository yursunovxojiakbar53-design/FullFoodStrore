<script setup>
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const { foodImage } = useFoodImages()
const wishlist = useWishlistStore()

onMounted(() => wishlist.ensureLoaded())

const props = defineProps({
	product: {
		type: Object,
		default: () => ({
			title: { uz: 'Mahsulot nomi' },
			description: { uz: 'Mahsulot tavsifi' },
			out_price: 0,
			currency: "so'm",
			discountPrice: null
		})
	}
})

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const { addToCart, isInCart, updateItemQuantity } = cartStore

const open = ref(false)
const activeProduct = ref(null)

const openModal = (product) => {
	open.value = true
	activeProduct.value = product
}
const handleAddToCart = (product) => {
	addToCart(product)
}

const updateQuantity = (newQuantity) => {
	updateItemQuantity(props.product.id, newQuantity)
}

const cartQuantity = computed(() => {
	const item = items.value.find((item) => item.id === props.product.id)
	return item ? item.quantity : 1
})
</script>
<template>
	<div class="flex flex-col rounded-xl bg-card overflow-hidden cursor-pointer transition-300 group shadow-box hover:shadow-blog h-full">
		<div class="w-full relative aspect-square overflow-hidden" @click="openModal(product)">
			<button
				type="button"
				class="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110"
				:aria-label="wishlist.isFavorite(product.id) ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'"
				@click.stop="wishlist.toggle(product)"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					:class="wishlist.isFavorite(product.id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-500'">
					<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
				</svg>
			</button>
			<CommonImage class="w-full h-full transition-transform duration-300 group-hover:scale-105" :src="foodImage(product)" :alt="product?.title?.uz" :image-class="'object-center'" />
		</div>
		<div class="flex flex-col p-1.5 sm:p-4 flex-1">
			<h3 class="line-clamp-1 sm:text-lg font-semibold cursor-pointer">{{ product?.title?.uz }}</h3>
			<p class="line-clamp-1 text-xs sm:text-sm text-foreground/60">
				{{ product?.description?.uz }}
			</p>
			<div class="flex flex-col my-2">
				<span class="line-through text-muted-foreground text-xs" :class="product?.discountPrice ? '' : 'invisible'">{{ formatPrice(product?.discountPrice || product?.out_price) }} {{ product?.currency }}</span>
				<span class="text-base sm:text-lg lg:text-xl font-medium">
					{{ formatPrice(product?.out_price) }} <span>{{ product?.currency }}</span>
				</span>
			</div>
			<div class="mt-auto">
				<Button v-if="!isInCart(product.id)" @click="handleAddToCart(product)" class="rounded-xl w-full">
					Savatga qo'shish
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
						<path d="M5 12h14" />
						<path d="M12 5v14" />
					</svg>
				</Button>
				<NumberField v-else :min="1" v-model="cartQuantity" @update:model-value="updateQuantity($event)">
					<NumberFieldContent>
						<NumberFieldDecrement />
						<NumberFieldInput class="rounded-xl" readonly />
						<NumberFieldIncrement />
					</NumberFieldContent>
				</NumberField>
			</div>
		</div>
		<ModalProduct v-model="open" :product="activeProduct" />
	</div>
</template>
