<script setup>
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const { deleteFromCart, clearCart } = cartStore
</script>

<template>
	<div class="hidden xl:block">
		<div class="sticky top-14 h-[calc(100vh-56px)]">
			<div class="h-full border border-dashed rounded-t-xl overflow-hidden">
				<div class="flex flex-col h-full">
					<div class="flex-center-between p-4">
						<p class="text-lg font-semibold">Savat</p>
						<button @click="clearCart">Tozalash</button>
					</div>
					<div class="no-scrollbar h-full overflow-y-auto">
						<CommonNoData v-if="items.length === 0" text="Hozircha savatingiz boʻsh" />
						<div v-else class="flex-center-between gap-2 py-2 pb-4 px-4 border-b last:border-b-0 transition-300" v-for="item in items" :key="item.id">
							<div class="flex-y-center gap-2">
								<div class="relative overflow-hidden shrink-0 w-10 h-10 flex-center">
									<CommonImage class="w-full h-full" :src="`https://tarnov.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2F${item.image}&w=1920&q=75`" :alt="item.title?.uz" :image-class="'object-center rounded'" />
								</div>
								<div class="flex flex-col gap-0.5">
									<h5 class="font-medium text-sm line-clamp-1">{{ item?.title?.uz }}</h5>
									<p class="text-xs line-clamp-1 text-muted-foreground font-medium">{{ formatPrice(item.out_price) }} {{ item.currency }}</p>
								</div>
							</div>
							<div class="flex flex-col items-end gap-0.5">
								<button @click="deleteFromCart(item.id)" class="opacity-95 hover:opacity-100">
									<Icon icon="ph:trash-duotone" />
								</button>
								<span class="text-xs text-muted-foreground font-medium">Soni: {{ item.quantity }}</span>
							</div>
						</div>
					</div>
					<div class="p-4 grid gap-2">
						<NuxtLink to="/cart">
							<Button class="w-full justify-between h-12 rounded-lg">
								<span>Savatga O'tish</span>
								<span class="text-lg font-semibold">{{ formatPrice(cartStore.totalPrice) }} so'm</span>
							</Button>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
