<script setup>
import { Phone, Mail, MapPin, Truck, CreditCard, ShoppingBag, XCircle } from 'lucide-vue-next'

definePageMeta({
	layout: 'profile'
})
</script>

<template>
	<div>
		<h1 class="section-title mb-6">Yordam</h1>

		<!-- Tez-tez beriladigan savollar -->
		<section class="mb-8">
			<h2 class="text-xl font-semibold mb-4">Tez-tez beriladigan savollar (FAQ)</h2>
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<ShoppingBag class="w-5 h-5 text-muted-foreground flex-shrink-0" />
					<div>
						<strong>Qanday qilib buyurtma berish mumkin?</strong><br />
						Sayt orqali menyuni ko‘rib chiqing, ovqatni tanlang va savatga qo‘shing. Keyin to‘lovni amalga oshirib, tasdiqlash xabarini kuting.
					</div>
				</li>
				<li class="flex items-start gap-3">
					<Truck class="w-5 h-5 text-muted-foreground flex-shrink-0" />
					<div>
						<strong>Yetkazib berish qancha vaqtda amalga oshiriladi?</strong><br />
						O‘rtacha 30-60 daqiqa ichida. Manzilga qarab vaqt farq qilishi mumkin.
					</div>
				</li>
				<li class="flex items-start gap-3">
					<CreditCard class="w-5 h-5 text-muted-foreground flex-shrink-0" />
					<div>
						<strong>Qanday to‘lov usullari mavjud?</strong><br />
						Click, Payme, naqd pul va plastik karta orqali to‘lov qabul qilinadi.
					</div>
				</li>
				<li class="flex items-start gap-3">
					<XCircle class="w-5 h-5 text-muted-foreground flex-shrink-0" />
					<div>
						<strong>Buyurtmani qanday bekor qilish mumkin?</strong><br />
						Agar ovqat tayyorlash jarayoni boshlanmagan bo‘lsa, qo‘llab-quvvatlash xizmatiga bog‘lanib bekor qilishingiz mumkin.
					</div>
				</li>
			</ul>
		</section>

		<section class="mb-8">
			<h2 class="text-xl font-semibold mb-4">To‘lov va Yetkazib Berish</h2>
			<ul class="space-y-2">
				<li class="flex items-start gap-3"><strong>Yetkazib berish hududlari:</strong> Buxoro shahri va atrof hududlar.</li>
				<li class="flex items-start gap-3"><strong>To‘lov turlari:</strong> Naqd, karta, Click, Payme.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-4">Aloqa</h2>
			<ul class="space-y-2">
				<li class="flex items-start gap-3">
					<strong>Telefon:</strong>
					<a href="tel:+998930819140">+998 93 081 91 40</a>
				</li>
				<li class="flex items-start gap-3"><strong>E-mail:</strong> support@marvarud.uz</li>
				<li class="flex items-start gap-3"><strong>Manzil:</strong> Buxoro, Markaziy ko‘cha, 12</li>
			</ul>
		</section>
	</div>
</template>
