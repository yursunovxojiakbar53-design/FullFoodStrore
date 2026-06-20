<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const api = useApi()
const swiperValue = ref(null);
const slides = ref([]);

onMounted(async () => {
	try {
		const res = await api.get('/open/carousel')
		slides.value = api.extractList(res)
	} catch {
		slides.value = []
	}
})

const getImageUrl = (item) => {
	return api.fileUrl(item?.imageUrl || item?.attachment?.id || item?.attachmentId)
}

const onSwiper = (swiper) => {
	swiperValue.value = swiper;
};

const settings = {
	loop: true,
	lazy: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false
	},
	pagination: {
		clickable: true
	},
	slidesPerView: 1,
	spaceBetween: 0
};
</script>

<template>
	<div class="overflow-hidden main-slider relative">
		<Swiper @swiper="onSwiper" v-bind="settings" :modules="[Autoplay, Pagination]">
			<template v-if="slides.length">
				<SwiperSlide v-for="slide in slides" :key="slide.id" class="relative w-full">
					<img :src="getImageUrl(slide)" :alt="slide.title || 'Banner'" class="w-full h-[32rem] md:h-[40rem] object-cover" />
				</SwiperSlide>
			</template>
			<template v-else>
				<SwiperSlide class="relative w-full">
					<img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop" class="w-full h-[32rem] md:h-[40rem] object-cover" alt="Food Store" />
				</SwiperSlide>
			</template>
		</Swiper>

		<!-- Qorong'i lyuks overlay -->
		<div class="pointer-events-none absolute inset-0 z-[7] bg-gradient-to-t from-black/90 via-black/55 to-black/40"></div>

		<!-- Hero kontent -->
		<div class="pointer-events-none absolute inset-0 z-[8] flex flex-col items-center justify-center px-4 text-center">
			<p class="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a24b]">
				Premium restoran tajribasi
			</p>
			<h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
				Sifat va inovatsiya
			</h1>
			<p class="mt-5 max-w-xl text-base sm:text-lg text-gray-200">
				Tez, qulay, va xususiyatli xizmat sifati
			</p>
			<div class="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
				<NuxtLink
					to="/category"
					class="rounded-md bg-[#c9a24b] px-7 py-3 text-sm sm:text-base font-semibold text-black transition hover:bg-[#b8923f]"
				>
					Menyu ko'rish
				</NuxtLink>
				<NuxtLink
					to="/about"
					class="rounded-md border border-white/70 px-7 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10"
				>
					Biz haqimizda
				</NuxtLink>
			</div>
		</div>

		<button @click="swiperValue?.slidePrev()" class="sm:flex hidden items-center justify-center absolute z-[9] left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20">
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
		</button>

		<button @click="swiperValue?.slideNext()" class="sm:flex hidden items-center justify-center absolute z-[9] right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20">
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m12 5 7 7-7 7" />
				<path d="M5 12h14" />
			</svg>
		</button>
	</div>
</template>

<style>
.main-slider .swiper-pagination-bullet {
	transition: all 0.3s;
	background-color: #fff !important;
	width: 8px;
	height: 8px;
	border-radius: 12px;
	opacity: 0.6;
}
.main-slider .swiper-pagination-bullet-active {
	background-color: #c9a24b !important;
	width: 16px;
	opacity: 1;
}
@media (min-width: 1024px) {
	.main-slider .swiper-pagination-bullet {
		width: 12px;
		height: 12px;
		border-radius: 16px;
	}
	.main-slider .swiper-pagination-bullet-active {
		width: 48px;
	}
}
</style>
