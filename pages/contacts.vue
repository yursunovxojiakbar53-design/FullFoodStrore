<script setup>
const form = reactive({
	name: '',
	phone: '',
	email: '',
	subject: '',
	message: ''
})

const subjects = ['Umumiy savol', 'Buyurtma', 'Hamkorlik', 'Shikoyat', 'Taklif']

const benefits = [
	{ icon: '💎', title: '10% doimiy chegirma', text: 'Barcha mahsulotlarda' },
	{ icon: '🚀', title: 'Tezkor yetkazib berish', text: '2 soat ichida yetkazib berish' },
	{ icon: '🛍️', title: 'Eksklyuziv mahsulotlar', text: "Gold a'zolar uchun maxsus" },
	{ icon: '🎧', title: "VIP qo'llab-quvvatlash", text: '24/7 ustuvor xizmat' },
	{ icon: '🎁', title: "Tug'ilgan kun bonuslari", text: "Maxsus sovg'alar va chegirmalar" },
	{ icon: '💰', title: 'Cashback 5%', text: 'Har bir xariddan qaytarib olish' }
]

const submit = () => {
	const subject = encodeURIComponent(`FoodStore bog'lanish: ${form.subject || 'Yangi xabar'}`)
	const body = encodeURIComponent(
		`Ism: ${form.name}\n` +
		`Telefon: ${form.phone}\n` +
		`Email: ${form.email}\n` +
		`Mavzu: ${form.subject}\n\n` +
		`Xabar:\n${form.message}`
	)
	window.location.href = `mailto:yursunovxojiakbar53@gmail.com?subject=${subject}&body=${body}`
}
</script>

<template>
	<div class="py-12">
		<div class="grid gap-10 lg:grid-cols-2">
			<!-- ── CHAP: Bog'lanish + forma ─────────────────────────────── -->
			<div>
				<h1 class="text-4xl sm:text-5xl font-bold">Bog'lanish</h1>
				<p class="mt-3 text-muted-foreground">Biz bilan bog'laning va eng yaxshi xizmatdan bahramand bo'ling</p>

				<!-- Kontakt kartalari -->
				<div class="mt-8 grid gap-4 sm:grid-cols-3">
					<div class="rounded-xl border p-4">
						<span class="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
							</svg>
						</span>
						<p class="mt-3 text-sm font-semibold">+998 90 123 45 67</p>
						<p class="text-xs text-muted-foreground">24/7 Qo'llab-quvvatlash</p>
					</div>
					<div class="rounded-xl border p-4">
						<span class="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</span>
						<p class="mt-3 text-sm font-semibold">info@foodstore.uz</p>
						<p class="text-xs text-muted-foreground">Tezkor javob beramiz</p>
					</div>
					<div class="rounded-xl border p-4">
						<span class="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
						</span>
						<p class="mt-3 text-sm font-semibold">Toshkent, O'zbekiston</p>
						<p class="text-xs text-muted-foreground">Barcha filiallarimiz</p>
					</div>
				</div>

				<!-- Forma -->
				<form class="mt-8 space-y-5" @submit.prevent="submit">
					<div class="grid gap-5 sm:grid-cols-2">
						<label class="block text-sm font-medium">
							To'liq ismingiz
							<input v-model="form.name" required placeholder="Ismingizni kiriting" class="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400" />
						</label>
						<label class="block text-sm font-medium">
							Telefon raqamingiz
							<input v-model="form.phone" placeholder="+998 (__) ___-__-__" class="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400" />
						</label>
					</div>
					<div class="grid gap-5 sm:grid-cols-2">
						<label class="block text-sm font-medium">
							Email manzilingiz
							<input v-model="form.email" type="email" placeholder="email@example.com" class="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400" />
						</label>
						<label class="block text-sm font-medium">
							Xabar mavzusi
							<select v-model="form.subject" class="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400">
								<option value="" disabled>Mavzuni tanlang</option>
								<option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
							</select>
						</label>
					</div>
					<label class="block text-sm font-medium">
						Xabaringiz
						<textarea v-model="form.message" rows="5" placeholder="Xabaringizni yozing..." class="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"></textarea>
					</label>
					<div class="flex flex-wrap items-center gap-4">
						<button type="submit" class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 text-sm font-semibold text-amber-950 transition hover:from-amber-300 hover:to-yellow-400">
							Xabar yuborish
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</button>
						<p class="max-w-xs text-xs text-muted-foreground">
							Ma'lumotlaringiz maxfiyligi kafolatlanadi va uchinchi shaxslarga berilmaydi.
						</p>
					</div>
				</form>
			</div>

			<!-- ── O'NG: Gold Tarif ─────────────────────────────────────── -->
			<div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d160a] via-[#2c2009] to-[#15100a] p-8 text-white shadow-xl">
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Gold Tarif</p>
				<h2 class="mt-2 text-3xl font-bold leading-tight text-amber-100">
					Boylik va hashamat<br />har bir buyurtmada
				</h2>
				<p class="mt-3 text-sm text-white/60">
					Gold tarif – bu siz uchun maxsus imtiyozlar, tezkor yetkazib berish va eksklyuziv bonuslar dunyosi.
				</p>

				<!-- Gold member karta -->
				<div class="my-7 ml-auto max-w-xs rounded-2xl bg-gradient-to-br from-[#caa14e] via-[#f0d896] to-[#b8860b] p-5 shadow-lg">
					<div class="flex items-start justify-between">
						<span class="text-2xl">👑</span>
						<span class="text-xs font-semibold tracking-widest text-[#3a2a06]">FOODSTORE</span>
					</div>
					<p class="mt-8 text-center text-lg font-bold tracking-[0.3em] text-[#3a2a06]">GOLD MEMBER</p>
				</div>

				<!-- Imtiyozlar -->
				<div class="space-y-4">
					<div v-for="b in benefits" :key="b.title" class="flex items-start gap-3">
						<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-lg">{{ b.icon }}</span>
						<div>
							<p class="text-sm font-semibold text-amber-50">{{ b.title }}</p>
							<p class="text-xs text-white/50">{{ b.text }}</p>
						</div>
					</div>
				</div>

				<button class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 px-5 py-3 text-sm font-bold text-[#2a1f0a] transition hover:from-amber-300 hover:to-yellow-500">
					Gold tarifga o'tish 👑
				</button>
			</div>
		</div>
	</div>
</template>
