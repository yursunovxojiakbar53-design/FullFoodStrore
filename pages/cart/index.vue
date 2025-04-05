<script setup>
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { updateItemQuantity, getItemTotal, deleteFromCart } = cartStore
const { totalPrice, items } = storeToRefs(cartStore)

const getItemQuantity = (productId) => {
	const item = items.value.find((item) => item.id === productId)
	return item ? item.quantity : 1
}

const updateQuantity = (productId, newQuantity) => {
	updateItemQuantity(productId, newQuantity)
}
</script>

<template>
	<div class="mt-10">
		<h1 class="section-title">Savatcha</h1>
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_400px] md:gap-8">
			<div class="flex flex-col space-y-4 sm:space-y-6 py-4">
				<div v-if="items.length === 0" class="flex-center flex-col gap-4 h-full">
					<CommonNoData text="Hozircha savatingiz boʻsh" class="!h-fit flex-initial" />
					<NuxtLink to="/">
						<Button>Mahsulotlar</Button>
					</NuxtLink>
				</div>
				<template v-else>
					<div class="rounded-lg dark:border shadow-blog hover:shadow-box p-4 md:p-6 relative" v-for="(item, key) in items" :key>
						<div class="space-y-2 md:flex md:items-center md:justify-between md:gap-4">
							<div class="shrink-0 md:order-1 h-20 w-20 md:h-24 md:w-24 border-2 rounded-xl overflow-hidden relative">
								<img class="h-full w-full object-cover" src="/assets/images/product.webp" alt="imac image" />
								<img class="hidden h-full w-full object-cover" src="/assets/images/product.webp" alt="imac image" />
							</div>

							<div class="flex items-center justify-between md:order-3 md:justify-end gap-2">
								<div class="flex items-center">
									<NumberField class="max-w-[120px]" :min="1" @update:model-value="updateQuantity(item.id, $event)" :model-value="getItemQuantity(item.id)">
										<NumberFieldContent>
											<NumberFieldDecrement />
											<NumberFieldInput class="rounded-xl" readonly />
											<NumberFieldIncrement />
										</NumberFieldContent>
									</NumberField>
								</div>
								<div class="text-end md:order-4 md:w-32 whitespace-nowrap">
									<p class="sm:text-base text-sm font-medium sm:font-bold">{{ formatPrice(getItemTotal(item.id)) }} so'm</p>
								</div>
							</div>

							<div class="w-full flex-1 md:order-2">
								<p class="sm:text-lg text-base font-semibold">{{ item.title.uz }}</p>
								<p class="text-xs text-muted-foreground mb-2 line-clamp-2">
									{{ item.description.uz }}
								</p>
								<div>
									<p class="line-through text-muted-foreground text-xs" v-if="false">120 000 UZS</p>
									<p class="sm:text-xl text-base font-semibold">{{ formatPrice(item.out_price) }} UZS</p>
								</div>
							</div>
						</div>
						<div class="absolute top-4 right-4 md:top-4 md:right-4">
							<button class="opacity-80 hover:opacity-100" @click="deleteFromCart(item.id)">
								<Icon icon="ph:trash-duotone" />
							</button>
						</div>
					</div>
				</template>
			</div>
			<div class="order-last md:order-last">
				<div class="sticky top-20 rounded-xl shadow-blog dark:border border-dashed bg-card p-4 text-card-foreground">
					<div class="flex flex-col gap-4">
						<h3 class="font-bold text-xl">Buyurtmangiz</h3>
						<div class="flex-center-between">
							Mahsulotlar soni <span class="font-medium">{{ items.length }} ta</span>
						</div>
						<div class="flex-center-between">
							Mahsulotlar narxi <span class="font-medium">{{ formatPrice(totalPrice) }} so'm</span>
						</div>
						<div class="flex-center-between">Yetkazib berish <span class="font-medium">0 so'm</span></div>
						<Separator />
						<div class="flex-center-between">
							To'lash uchun <span class="font-medium">{{ formatPrice(totalPrice) }}so'm</span>
						</div>
						<NuxtLink to="/cart/checkout" class="w-full"> <Button class="rounded-xl h-10 w-full">To'lov sahifasiga o'tish</Button> </NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
