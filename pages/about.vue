<script setup lang="ts">
const stats = [
	{ value: 2010, suffix: '', label: 'Tashkil etilgan yil' },
	{ value: 50, suffix: '+', label: 'Menyu taomlari' },
	{ value: 1000, suffix: '+', label: 'Mamnun mijozlar' },
	{ value: 5, suffix: '+', label: 'Filiallar' }
]

const displayValues = ref(stats.map(() => 0))
const statsRef = ref<HTMLElement | null>(null)
let started = false

// Barcha raqamlar 0 dan boshlanib, bir vaqtda (~2.5s) tugaydi
const animateCounts = () => {
	if (started) return
	started = true
	const duration = 2500
	const startTime = performance.now()
	const tick = (now: number) => {
		const p = Math.min((now - startTime) / duration, 1)
		const eased = 1 - Math.pow(1 - p, 3)
		displayValues.value = stats.map((s) => Math.round(s.value * eased))
		if (p < 1) requestAnimationFrame(tick)
		else displayValues.value = stats.map((s) => s.value)
	}
	requestAnimationFrame(tick)
}

onMounted(() => {
	const el = statsRef.value
	if (!el) {
		animateCounts()
		return
	}
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				animateCounts()
				observer.disconnect()
			}
		},
		{ threshold: 0.3 }
	)
	observer.observe(el)
})

const values = [
	{ icon: '🥗', title: 'Yuqori sifat', text: "Faqat yangi va tabiiy mahsulotlardan tayyorlangan taomlar. Har bir taom mehr bilan pishiriladi." },
	{ icon: '🚀', title: 'Tezkor yetkazib berish', text: "Buyurtmangizni eng qisqa vaqt ichida issiq holatda eshigingizgacha yetkazamiz." },
	{ icon: '😊', title: "Samimiy xizmat", text: "Xushmuomala va g'amxo'r jamoamiz sizga har doim yordam berishga tayyor." }
]

</script>

<template>
	<div class="relative left-1/2 w-screen -translate-x-1/2">
		<!-- Section 1 — Hero -->
		<section class="relative overflow-hidden bg-gradient-to-br from-[#2b1d14] via-[#1a120c] to-[#241811] px-4 pt-32 pb-44 text-center">
			<p class="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Biz haqimizda</p>
			<h1 class="text-5xl sm:text-7xl font-extrabold text-white">Food<span class="text-red-500">Store</span></h1>
			<p class="mx-auto mt-5 max-w-2xl text-lg text-white/70">
				Mazali taomlar va unutilmas ta'mlar olami — 2010-yildan beri mehr bilan.
			</p>
		</section>

		<!-- Section 2 — Stats (suzuvchi karta + animatsiya) -->
		<section ref="statsRef" class="relative z-20 -mt-24 px-4">
			<div class="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white px-6 py-10 shadow-xl">
				<div class="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
					<div v-for="(stat, i) in stats" :key="stat.label">
						<p class="text-3xl sm:text-4xl font-extrabold text-orange-500">{{ displayValues[i] }}{{ stat.suffix }}</p>
						<p class="mt-1 text-sm text-gray-500">{{ stat.label }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 3 — Our values -->
		<section class="container py-16">
			<h2 class="text-center text-3xl font-bold mb-10">Bizning qadriyatlarimiz</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div
					v-for="value in values"
					:key="value.title"
					class="bg-white rounded-2xl p-8 text-center shadow-md transition-shadow duration-300 hover:shadow-xl"
				>
					<div class="text-5xl mb-4">{{ value.icon }}</div>
					<h3 class="text-xl font-bold mb-2 text-gray-900">{{ value.title }}</h3>
					<p class="text-gray-600">{{ value.text }}</p>
				</div>
			</div>
		</section>

		<!-- Section 4 — Our story (ochiq kitob) -->
		<section class="pt-24 pb-[150px]">
			<div class="max-w-7xl mx-auto px-4 [perspective:2000px]">
				<div class="book group relative mt-6 grid overflow-visible rounded-l-lg rounded-r-lg border border-[#c9a84c]/40 shadow-2xl transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] lg:min-h-[640px] lg:grid-cols-[1fr_28px_1fr]">
					<!-- Chap sahifa: matn -->
					<div class="book-page-left relative z-10 flex flex-col justify-center rounded-l-lg bg-gradient-to-r from-[#fdf6e3] to-[#f5ead0] px-8 sm:px-16 py-16 sm:py-20">
						<span class="text-[#c97c2d] uppercase tracking-widest font-semibold text-sm">
							Biz haqimizda
						</span>
						<h2 class="text-4xl sm:text-6xl font-bold text-[#2f1f14] mt-4 mb-10">
							Bizning hikoyamiz
						</h2>

						<div class="space-y-8">
							<div class="flex gap-5">
								<div class="w-16 h-16 shrink-0 rounded-full bg-[#f3dfc4] flex items-center justify-center text-2xl">🏪</div>
								<p class="text-lg text-gray-700 leading-8">
									FoodStore 2010-yilda Toshkent shahrida kichik restoran sifatida faoliyatini boshladi.
								</p>
							</div>

							<div class="flex gap-5">
								<div class="w-16 h-16 shrink-0 rounded-full bg-[#f3dfc4] flex items-center justify-center text-2xl">🏆</div>
								<p class="text-lg text-gray-700 leading-8">
									Yillar davomida rivojlanib bir nechta filiallarga ega bo'ldik.
								</p>
							</div>

							<div class="flex gap-5">
								<div class="w-16 h-16 shrink-0 rounded-full bg-[#f3dfc4] flex items-center justify-center text-2xl">🍽️</div>
								<p class="text-lg text-gray-700 leading-8">
									Har bir mijozga uy taomidek samimiy va betakror ta'm yetkazib beramiz.
								</p>
							</div>
						</div>
					</div>

					<!-- Kitob muqovasi (spine) -->
					<div class="book-spine relative z-30 hidden lg:block"></div>

					<!-- O'ng sahifa: rasm -->
					<div class="book-page-right relative z-10 min-h-[300px] overflow-hidden rounded-r-lg lg:min-h-full">
						<img
							src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80&auto=format&fit=crop"
							alt="FoodStore restorani"
							class="absolute inset-0 w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 6 — Call to action -->
		<section class="bg-gray-900">
			<div class="container py-32 text-center">
				<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
					Mazali taomlarimizni tatib ko'ring!
				</h2>
				<p class="text-white/80 mb-8 max-w-xl mx-auto">
					Eng sevimli taomlaringizni buyurtma qiling va FoodStore ta'mini his eting.
				</p>
				<NuxtLink
					to="/"
					class="inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-orange-600"
				>
					Buyurtma berish
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
/* Kitobning 3D egilishi (perspektiv ota elementdan keladi) */
.book {
	transform: rotateX(3deg);
	transform-style: preserve-3d;
}
.book:hover {
	transform: rotateX(3deg) translateY(-8px);
}

/* Sahifa burchaklari ko'tarilishi (curl) — kitobning tashqi pastki burchaklarida */
.book::before,
.book::after {
	content: '';
	position: absolute;
	bottom: 0;
	height: 40px;
	width: 45%;
	transform: translateY(55%);
	z-index: -1;
	pointer-events: none;
}
.book::before {
	left: 0;
	background: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.3), transparent 72%);
}
.book::after {
	right: 0;
	background: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.3), transparent 72%);
}

@media (min-width: 1024px) {
	/* Chap sahifa muqova tomon egiladi */
	.book-page-left {
		transform: rotateY(-2deg);
		transform-origin: right center;
		box-shadow: inset -30px 0 45px -30px rgba(0, 0, 0, 0.35);
	}
	/* O'ng sahifa muqovadan egiladi */
	.book-page-right {
		transform: rotateY(2deg);
		transform-origin: left center;
	}
	/* Rasm ustidan tushadigan muqova soyasi */
	.book-page-right::after {
		content: '';
		position: absolute;
		inset: 0;
		box-shadow: inset 30px 0 45px -30px rgba(0, 0, 0, 0.45);
		pointer-events: none;
		z-index: 6;
	}

	/* Markaziy muqova (book spine) */
	.book-spine {
		background: linear-gradient(to right, #3d2b1f 0%, #6b4c35 50%, #3d2b1f 100%);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
	}
	/* Spine tikuv chiziqlari (stitching) */
	.book-spine::before,
	.book-spine::after {
		content: '';
		position: absolute;
		top: 12px;
		bottom: 12px;
		width: 1px;
		background: repeating-linear-gradient(to bottom, rgba(201, 168, 76, 0.55) 0 6px, transparent 6px 13px);
	}
	.book-spine::before {
		left: 8px;
	}
	.book-spine::after {
		right: 8px;
	}
}
</style>
