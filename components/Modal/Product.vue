<script setup>
import { useMediaQuery } from '@vueuse/core';
const isDesktop = useMediaQuery('(min-width: 768px)');
const props = defineProps({
	modelValue: Boolean,
	product: {
		type: Object,
		default: () => ({
			title: { uz: 'Mahsulot nomi' },
			description: { uz: 'Mahsulot tavsifi' },
			out_price: 0,
			currency: "so'm",
			discountPrice: null
		})
	}
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
	<div>
		<ClientOnly>
			<Dialog v-if="isDesktop" :open="modelValue" @update:open="emit('update:modelValue', $event)">
				<DialogContent class="sm:max-w-[525px] p-0 max-h-[90vh]">
					<DialogHeader class="p-4 pb-0">
						<DialogTitle>{{ product?.title?.uz }}</DialogTitle>
					</DialogHeader>
					<div class="grid gap-4 px-4 overflow-y-auto">
						<div class="relative max-w-[350px] mx-auto w-full">
							<CommonImage :src="`https://tarnov.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2F${product.image}&w=1920&q=75`" :alt="product.title.uz" class="object-contain w-full h-full" />
						</div>
						<div class="flex flex-1 flex-col gap-1 pb-4">
							<h3 class="line-clamp-1 text-lg font-semibold">
								{{ formatPrice(product?.out_price) }} <span>{{ product?.currency }}</span>
							</h3>
							<p class="text-sm text-foreground/60">
								{{ product?.description?.uz }}
							</p>
						</div>
					</div>
					<DialogFooter class="gap-2 p-4">
						<Button class="rounded-xl w-full">
							Savatga qo'shish
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</Button>
						<NumberField class="w-full" :default-value="1" :min="1">
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput class="rounded-xl" />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Drawer v-else :open="modelValue" @update:open="emit('update:modelValue', $event)">
				<DrawerContent class="max-h-[90dvh]">
					<DrawerHeader class="text-left p-4">
						<DrawerTitle>Zig'ir oshi komplekt</DrawerTitle>
					</DrawerHeader>
					<div class="grid gap-4 px-4 h-full overflow-y-auto">
						<div class="relative max-w-[350px] mx-auto w-full">
							<CommonImage :src="`https://tarnov.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2F${product.image}&w=1920&q=75`" :alt="product.title.uz" class="object-contain w-full h-full" />
						</div>
						<div class="flex flex-1 flex-col gap-1 pb-4">
							<h3 class="line-clamp-1 text-lg font-semibold">60 500 so'm</h3>
							<p class="text-sm text-foreground/60">
								Samarqand zigi'r oshini tatib ko'ring! O'zgacha to'g'ralgan go‘sht, xushbo‘y ziravorlar va zig'ir yog'i o'ziga xos ta'mga ega nafis taom yaratadi. Hoziroq buyurtma bering va Samarqandning haqiqiy kulinariya asaridan bahramand bo'ling!
							</p>
						</div>
					</div>
					<DrawerFooter class="pt-2 px-4">
						<Button class="rounded-xl w-full">
							Savatga qo'shish
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</Button>
						<NumberField class="w-full" :default-value="1" :min="1">
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput class="rounded-xl" />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</ClientOnly>
	</div>
</template>
