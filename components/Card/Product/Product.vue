<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { useCartStore } from '@/stores/cart'

const api = useApi()

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

const settings = {
	loop: false,
	autoplay: false,
	slidesPerView: 1,
	spaceBetween: 12,
	pagination: {
		clickable: true
	},
	effect: 'fade'
}

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const { addToCart, isInCart, updateItemQuantity } = cartStore

const open = ref(false)
const activeProduct = ref(null)

const imageUrl = computed(() => {
	const id = props.product?.image
	return api.fileUrl(id)
})

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
		<div>
			<Swiper ref="swiperRef" v-bind="settings" :modules="[Autoplay, Pagination, EffectFade]" class="product-slider">
				<SwiperSlide @click="openModal(product)">
					<div class="w-full relative aspect-square cursor-pointer">
						<CommonImage class="w-full h-full" :src="imageUrl" :alt="product.title?.uz" :image-class="'object-center'" />
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
		<div class="flex flex-col p-1.5 sm:p-4 flex-1">
			<h3 class="line-clamp-1 sm:text-lg font-semibold cursor-pointer">{{ product?.title?.uz }}</h3>
			<p class="line-clamp-1 text-xs sm:text-sm text-foreground/60">
				{{ product?.description?.uz }}
			</p>
			<div class="flex flex-col my-2">
				<span class="line-through text-muted-foreground text-xs" v-if="product?.discountPrice">
					{{ formatPrice(product.discountPrice) }} {{ product?.currency }}
				</span>
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
				<NumberField v-else :min="1" :model-value="cartQuantity" @update:model-value="updateQuantity">
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

<style>
.product-slider .swiper-pagination-bullet {
	transition: all 0.3s;
	background-color: #fff !important;
	width: 24px;
	height: 2px;
	border-radius: 8px;
}
.product-slider .swiper-pagination-bullet-active {
	background-color: #fff !important;
	width: 32px;
}
</style>
