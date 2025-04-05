<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const swiperValue = ref(null);

const onSwiper = (swiper) => {
	swiperValue.value = swiper;
};

const settings = {
	loop: true,
	lazy: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false
	},
	pagination: {
		clickable: true
	},
	slidesPerView: 1,
	spaceBetween: 6,
	centeredSlides: true,
	breakpoints: {
		1024: {
			slidesPerView: 1.3,
			spaceBetween: 24
		}
	}
};
</script>

<template>
	<div class="overflow-hidden main-slider relative">
		<Swiper ref="swiperRef" @swiper="onSwiper" v-bind="settings" :modules="[Autoplay, Pagination]" class="!rounded-lg">
			<SwiperSlide v-for="(slide, idx) in 10" :key="idx" class="cursor-grab relative w-full z-1 md:!h-[35rem]">
				<img src="/assets/images/image.png" class="transition-200 w-full rounded-lg h-full object-cover" />
			</SwiperSlide>
		</Swiper>

		<button @click="swiperValue.slidePrev()" class="sm:block hidden absolute z-[9] left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-r-full">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
		</button>

		<button @click="swiperValue.slideNext()" class="sm:block hidden absolute z-[9] right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-l-full">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
}
.main-slider .swiper-pagination-bullet-active {
	background-color: #fff !important;
	width: 16px;
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
