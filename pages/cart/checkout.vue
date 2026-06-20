<script setup>
definePageMeta({ middleware: 'auth' })

const api = useApi()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()

const phone = ref('')
const deliverType = ref('DELEVER')
const paymentType = ref('CASH')
const couponCode = ref('')
const addressTitle = ref('')
const selectedFilialId = ref(null)
const filials = ref([])
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

onMounted(async () => {
	// Filiallarni yukla
	try {
		const res = await api.get('/api/filials')
		filials.value = api.extractList(res)
	} catch (e) {
		console.error('Filiallar yuklanmadi:', api.errorMessage(e))
	}
})

const submitOrder = async () => {
	errorMsg.value = ''

	if (!cartStore.items.length) {
		errorMsg.value = 'Savat bo\'sh. Avval mahsulot qo\'shing.'
		return
	}
	if (!phone.value) {
		errorMsg.value = 'Telefon raqamni kiriting'
		return
	}

	let addressId = null

	if (deliverType.value === 'DELEVER') {
		if (!addressTitle.value.trim()) {
			errorMsg.value = 'Yetkazish manzilini kiriting'
			return
		}
		try {
			const addrRes = await api.post('/address', {
				title: addressTitle.value.trim(),
				latitude: 0.0,
				longitude: 0.0
			})
			const address = api.unwrap(addrRes)
			addressId = address?.id
			if (!addressId) {
				errorMsg.value = 'Manzil saqlashda xatolik yuz berdi'
				return
			}
		} catch (e) {
			errorMsg.value = api.errorMessage(e, 'Manzil saqlashda xatolik')
			return
		}
	}

	if (deliverType.value === 'PICKUP' && !selectedFilialId.value) {
		errorMsg.value = 'Iltimos, filialni tanlang'
		return
	}

	const orderData = {
		phoneNumber: phone.value,
		deliverType: deliverType.value,
		paymentType: paymentType.value,
		addressId: deliverType.value === 'DELEVER' ? addressId : null,
		filialId: deliverType.value === 'PICKUP' ? selectedFilialId.value : null,
		couponCode: couponCode.value.trim() || null,
		items: cartStore.items.map((item) => ({
			productId: item.id,
			quantity: item.quantity
		}))
	}

	loading.value = true
	const res = await orderStore.createOrder(orderData)
	loading.value = false

	if (res.success) {
		// Buyurtma manzilini saqlash (order-status sahifasi uchun)
		try {
			const selFilial = filials.value.find((f) => f.id === selectedFilialId.value)
			localStorage.setItem('foodstore_last_order', JSON.stringify({
				deliverType: deliverType.value,
				address: addressTitle.value.trim(),
				filialName: selFilial?.title || '',
				filialAddress: selFilial?.description || '',
				phone: phone.value
			}))
		} catch {}
		cartStore.clearLocalCart()
		router.push('/profile/orders')
	} else {
		errorMsg.value = res.message || 'Buyurtma berishda xatolik yuz berdi'
	}
}
</script>

<template>
	<div class="max-w-2xl mx-auto py-8 px-4">
		<h1 class="text-2xl font-bold mb-6">🛒 Buyurtma berish</h1>

		<!-- Empty cart -->
		<div v-if="!cartStore.items.length" class="text-center py-16 text-muted-foreground">
			<p class="text-lg mb-4">Savat bo'sh</p>
			<NuxtLink to="/">
				<Button>Mahsulotlarga qaytish</Button>
			</NuxtLink>
		</div>

		<div v-else class="flex flex-col gap-4">
			<!-- Cart summary -->
			<div class="rounded-lg border bg-card p-4">
				<h2 class="font-semibold mb-3">Buyurtma tarkibi</h2>
				<div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm py-1.5 border-b last:border-0">
          <span class="text-foreground">
            {{ item.title?.uz || item.title }}
            <span class="text-muted-foreground">x{{ item.quantity }}</span>
          </span>
					<span class="font-medium">
            {{ (item.out_price * item.quantity).toLocaleString() }} so'm
          </span>
				</div>
				<div class="flex justify-between font-bold mt-3 pt-2 border-t">
					<span>Jami:</span>
					<span class="text-primary">{{ cartStore.totalPrice.toLocaleString() }} so'm</span>
				</div>
			</div>

			<!-- Phone -->
			<div class="rounded-lg border bg-card p-4">
				<Label class="mb-2 block font-semibold">📱 Telefon raqam</Label>
				<Input
					v-model="phone"
					placeholder="+998 90 123 45 67"
					type="tel"
				/>
			</div>

			<!-- Delivery type -->
			<div class="rounded-lg border bg-card p-4">
				<h2 class="font-semibold mb-3">🚚 Yetkazish turi</h2>
				<div class="flex gap-3 mb-4">
					<Button
						:variant="deliverType === 'DELEVER' ? 'default' : 'outline'"
						class="flex-1"
						@click="deliverType = 'DELEVER'"
					>🚚 Yetkazib berish</Button>
					<Button
						:variant="deliverType === 'PICKUP' ? 'default' : 'outline'"
						class="flex-1"
						@click="deliverType = 'PICKUP'"
					>🏪 Olib ketish</Button>
				</div>

				<!-- Delivery address -->
				<div v-if="deliverType === 'DELEVER'">
					<Label class="mb-1.5 block">Manzil</Label>
					<Input
						v-model="addressTitle"
						placeholder="Shahar, ko'cha, uy raqami"
					/>
				</div>

				<!-- Pickup: filial list -->
				<div v-if="deliverType === 'PICKUP'" class="flex flex-col gap-2">
					<Label class="mb-1 block">Filialni tanlang:</Label>
					<div v-if="filials.length" class="flex flex-col gap-2">
						<div
							v-for="filial in filials"
							:key="filial.id"
							@click="selectedFilialId = filial.id"
							class="p-3 rounded-md border cursor-pointer transition-all"
							:class="selectedFilialId === filial.id
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'hover:bg-muted'"
						>
							<div class="flex justify-between items-start">
								<p class="font-medium">{{ filial.title }}</p>
								<span v-if="selectedFilialId === filial.id" class="text-primary text-sm">✓</span>
							</div>
							<p v-if="filial.workHours" class="text-xs text-muted-foreground mt-1">
								🕐 {{ filial.workHours }}
							</p>
							<p v-if="filial.phoneNumber" class="text-xs text-muted-foreground">
								📞 {{ filial.phoneNumber }}
							</p>
						</div>
					</div>
					<p v-else class="text-sm text-muted-foreground py-2">
						Filiallar topilmadi
					</p>
				</div>
			</div>

			<!-- Payment -->
			<div class="rounded-lg border bg-card p-4">
				<h2 class="font-semibold mb-3">💳 To'lov turi</h2>
				<div class="flex gap-3">
					<Button
						:variant="paymentType === 'CASH' ? 'default' : 'outline'"
						class="flex-1"
						@click="paymentType = 'CASH'"
					>💵 Naqd</Button>
					<Button
						:variant="paymentType === 'CARD' ? 'default' : 'outline'"
						class="flex-1"
						@click="paymentType = 'CARD'"
					>💳 Karta</Button>
				</div>
			</div>

			<!-- Coupon -->
			<div class="rounded-lg border bg-card p-4">
				<Label class="mb-2 block font-semibold">🎟 Kupon kod (ixtiyoriy)</Label>
				<Input
					v-model="couponCode"
					placeholder="Kupon kodini kiriting"
				/>
			</div>

			<!-- Error -->
			<p v-if="errorMsg" class="text-sm text-red-500 bg-red-50 rounded-md px-4 py-3">
				⚠️ {{ errorMsg }}
			</p>

			<!-- Submit -->
			<Button
				class="w-full h-12 text-base font-semibold"
				@click="submitOrder"
				:disabled="loading || !cartStore.items.length"
			>
				<span v-if="loading">⏳ Buyurtma berilmoqda...</span>
				<span v-else>
          ✅ Buyurtmani tasdiqlash — {{ cartStore.totalPrice.toLocaleString() }} so'm
        </span>
			</Button>
		</div>
	</div>
</template>
