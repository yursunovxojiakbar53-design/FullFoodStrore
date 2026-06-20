<script setup>
import { Calendar, Clock, CreditCard, XCircle, ChevronDown, Phone, Mail, MapPin, Truck, Headphones, HelpCircle, Crown } from 'lucide-vue-next'

definePageMeta({
	layout: 'profile',
	middleware: 'auth'
})

const faqs = [
	{
		icon: Calendar,
		box: 'bg-amber-100 text-amber-600',
		q: 'Qanday qilib buyurtma berish mumkin?',
		a: "Sayt orqali menyuni ko'rib chiqing, ovqatni tanlang va savatga qo'shing. Keyin to'lovni amalga oshirib, tasdiqlash xabarini kuting."
	},
	{
		icon: Clock,
		box: 'bg-purple-100 text-purple-600',
		q: 'Yetkazib berish qancha vaqtda amalga oshiriladi?',
		a: "O'rtacha 30–60 daqiqa ichida. Manzilga qarab vaqt farq qilishi mumkin."
	},
	{
		icon: CreditCard,
		box: 'bg-green-100 text-green-600',
		q: "Qanday to'lov usullari mavjud?",
		a: "Click, Payme, naqd pul va plastik karta orqali to'lov qabul qilinadi."
	},
	{
		icon: XCircle,
		box: 'bg-red-100 text-red-600',
		q: 'Buyurtmani qanday bekor qilish mumkin?',
		a: "Agar ovqat tayyorlash jarayoni boshlanmagan bo'lsa, qo'llab-quvvatlash xizmatiga bog'lanib bekor qilishingiz mumkin."
	}
]

const openItems = ref(new Set([0, 1, 2, 3]))
const isOpen = (i) => openItems.value.has(i)
const toggle = (i) => {
	const s = new Set(openItems.value)
	s.has(i) ? s.delete(i) : s.add(i)
	openItems.value = s
}
</script>

<template>
	<div>
		<!-- Sarlavha -->
		<h1 class="text-2xl font-bold">Yordam</h1>
		<div class="mt-2 mb-8 h-1 w-16 rounded bg-gradient-to-r from-amber-400 to-yellow-600"></div>

		<!-- FAQ -->
		<section class="mb-8">
			<div class="mb-4 flex items-center gap-2">
				<span class="grid h-7 w-7 place-items-center rounded-full bg-purple-100 text-purple-600">
					<HelpCircle class="h-4 w-4" />
				</span>
				<h2 class="text-lg font-bold">Tez-tez beriladigan savollar <span class="text-amber-500">(FAQ)</span></h2>
			</div>

			<div class="space-y-3">
				<div v-for="(faq, i) in faqs" :key="i" class="rounded-xl border bg-card p-4 transition hover:shadow-sm">
					<button type="button" class="flex w-full items-start gap-3 text-left" @click="toggle(i)">
						<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg" :class="faq.box">
							<component :is="faq.icon" class="h-5 w-5" />
						</span>
						<div class="flex-1">
							<p class="font-semibold">{{ faq.q }}</p>
							<p v-show="isOpen(i)" class="mt-1 text-sm text-muted-foreground">{{ faq.a }}</p>
						</div>
						<ChevronDown class="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform" :class="isOpen(i) ? 'rotate-180' : ''" />
					</button>
				</div>
			</div>
		</section>

		<!-- To'lov & Aloqa -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- To'lov va Yetkazib Berish -->
			<div class="rounded-2xl border bg-card p-6 shadow-sm">
				<div class="mb-5 flex items-center gap-2">
					<span class="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
						<Truck class="h-5 w-5" />
					</span>
					<h2 class="text-base font-bold">To'lov va Yetkazib Berish</h2>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm font-semibold">Yetkazib berish hududlari</p>
						<p class="mt-1 text-sm text-muted-foreground">Buxoro shahri va atrof hududlar.</p>
						<span class="mt-3 grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-600">
							<MapPin class="h-6 w-6" />
						</span>
					</div>
					<div>
						<p class="text-sm font-semibold">To'lov turlari</p>
						<p class="mt-1 text-sm text-muted-foreground">Naqd, karta, Click, Payme.</p>
						<span class="mt-3 grid h-12 w-12 place-items-center rounded-full bg-green-50 text-green-600">
							<CreditCard class="h-6 w-6" />
						</span>
					</div>
				</div>
			</div>

			<!-- Aloqa -->
			<div class="rounded-2xl border bg-card p-6 shadow-sm">
				<div class="mb-5 flex items-center gap-2">
					<span class="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
						<Headphones class="h-5 w-5" />
					</span>
					<h2 class="text-base font-bold">Aloqa</h2>
				</div>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70"><Phone class="h-4 w-4" /></span>
						<div>
							<p class="text-xs text-muted-foreground">Telefon</p>
							<a href="tel:+998903630177" class="text-sm font-medium text-primary hover:underline">+998 903630177</a>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70"><Mail class="h-4 w-4" /></span>
						<div>
							<p class="text-xs text-muted-foreground">E-mail</p>
							<p class="text-sm font-medium text-primary">support@murodilovich_16s</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70"><MapPin class="h-4 w-4" /></span>
						<div>
							<p class="text-xs text-muted-foreground">Manzil</p>
							<p class="text-sm font-medium">Asosiy manzil</p>
							<p class="text-sm text-muted-foreground">Farg'ona viloyati, Oltiariq tumani</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70"><Clock class="h-4 w-4" /></span>
						<div>
							<p class="text-xs text-muted-foreground">Ish vaqti</p>
							<p class="text-sm font-medium">08:00 – 23:00 (Har kuni)</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pastki banner -->
		<div class="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-100 px-5 py-4">
			<span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-400 text-white">
				<Crown class="h-5 w-5" />
			</span>
			<p class="text-sm font-medium text-amber-800">
				Siz uchun doim xizmatdamiz! Savollaringiz bo'lsa, bemalol bog'laning 💛
			</p>
		</div>
	</div>
</template>
