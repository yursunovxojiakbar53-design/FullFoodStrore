<template>
	<div class="relative flex min-h-screen flex-col bg-background">
		<div class="flex flex-1 flex-col">
			<LayoutHeader />
			<div class="flex flex-1 pt-14">
				<div class="flex-1 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 md:gap-6 container border-dashed">
					<aside class="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem-1px)] w-full shrink-0 overflow-y-auto -ml-2 md:block">
						<ScrollArea class="lg:border-r border-dashed h-full pb-12 pr-6 pt-6 text-sm md:pr-4">
							<ul class="flex flex-col gap-1">
								<li v-for="item in menuItems" :key="item.to">
									<NuxtLink :to="item.to" class="h-10 flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary" :class="{ 'bg-muted text-primary': isActive(item.to) }">
										<Icon :icon="item.icon" class="text-base"></Icon>
										<span class="truncate text-nowrap">{{ t(item.labelKey) }}</span>
										<span v-if="item.to === '/profile/wishlist' && wishlist.count" class="ml-auto grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">{{ wishlist.count }}</span>
									</NuxtLink>
								</li>
								<li class="w-full h-px border-b border-dashed"></li>
								<li>
									<button class="h-10 w-full flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-destructive" @click="handleLogout">
										<Icon icon="lets-icons:sign-out-circle-duotone-line" class="text-base"></Icon>
										<span class="truncate text-nowrap">{{ t('profile.logout') }}</span>
									</button>
								</li>
							</ul>

							<!-- Promo karta -->
							<div class="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 p-4 text-center">
								<p class="text-sm font-bold text-amber-700">{{ t('common.fastDelivery') }}</p>
								<p class="mt-1 text-xs text-amber-700/70">{{ t('common.fastDeliveryDesc') }}</p>
								<img
									v-if="!scooterError"
									:src="scooterSrc"
									alt="Tez yetkazib berish"
									class="mx-auto mt-3 w-36 object-contain drop-shadow-md"
									@error="scooterError = true"
								/>
								<div v-else class="mt-3 text-7xl leading-none drop-shadow-sm">🛵</div>
							</div>
						</ScrollArea>
					</aside>
					<main class="relative py-6">
						<slot />
					</main>
				</div>
			</div>
			<LayoutFooter />
		</div>
	</div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useWishlistStore } from '@/stores/wishlist'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const wishlist = useWishlistStore()
onMounted(() => wishlist.fetch())

// Scooter rasmi bo'lmasa emoji ko'rsatamiz (dinamik src — build'da import qilinmaydi)
const scooterSrc = '/images/scooter.png'
const scooterError = ref(false)

const menuItems = [
	{ to: '/profile', icon: 'ph:user-duotone', labelKey: 'profile.personalInfo' },
	{ to: '/profile/order-status', icon: 'ph:package-duotone', labelKey: 'profile.orderStatus' },
	{ to: '/profile/orders', icon: 'ph:clipboard-duotone', labelKey: 'profile.orderHistory' },
	{ to: '/profile/payments', icon: 'ph:credit-card-duotone', labelKey: 'profile.payments' },
	{ to: '/profile/wishlist', icon: 'ph:heart-duotone', labelKey: 'profile.wishlist' },
	{ to: '/profile/help', icon: 'ph:question-duotone', labelKey: 'profile.help' }
]

const isActive = (path) => {
	return route.path === path
}

const handleLogout = async () => {
	authStore.logout()
	await navigateTo('/')
}
</script>
