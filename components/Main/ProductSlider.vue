<script setup>
const props = defineProps({
	products: { type: Array, default: () => [] }
})

const scroller = ref(null)
// Strelkalar faqat 4 tadan ortsa chiqadi
const showArrows = computed(() => props.products.length > 4)

// Bir karta (kenglik + gap) qadami
const step = () => {
	const el = scroller.value
	if (!el) return 0
	const card = el.querySelector('[data-card]')
	const gap = 16
	return card ? card.getBoundingClientRect().width + gap : el.clientWidth
}

const next = () => scroller.value?.scrollBy({ left: step(), behavior: 'smooth' })
const prev = () => scroller.value?.scrollBy({ left: -step(), behavior: 'smooth' })
</script>

<template>
	<div class="relative">
		<!-- Chap strelka -->
		<button
			v-if="showArrows"
			type="button"
			aria-label="Oldingi"
			class="absolute left-1 top-[38%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border bg-white/90 text-foreground shadow-lg backdrop-blur transition hover:bg-white"
			@click="prev"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
		</button>

		<!-- Slayder -->
		<div ref="scroller" class="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x scroll-smooth">
			<CardProduct
				v-for="product in products"
				:key="product.id"
				:product="product"
				data-card
				class="w-[240px] sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] shrink-0 snap-start" />
		</div>

		<!-- O'ng strelka -->
		<button
			v-if="showArrows"
			type="button"
			aria-label="Keyingi"
			class="absolute right-1 top-[38%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border bg-white/90 text-foreground shadow-lg backdrop-blur transition hover:bg-white"
			@click="next"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
		</button>
	</div>
</template>
