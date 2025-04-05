<template>
	<div class="relative flex min-h-screen flex-col bg-background">
		<div class="flex flex-1 flex-col">
			<LayoutHeader />
			<div class="flex flex-1">
				<div class="flex-1 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 md:gap-6 container border-dashed">
					<aside class="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem-1px)] w-full shrink-0 overflow-y-auto -ml-2 md:block">
						<ScrollArea class="lg:border-r border-dashed h-full pb-12 pr-6 pt-6 text-sm md:pr-4">
							<ul class="flex flex-col gap-1">
								<li v-for="item in menuItems" :key="item.to">
									<NuxtLink :to="item.to" class="h-10 flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary" :class="{ 'bg-muted text-primary': isActive(item.to) }">
										<Icon :icon="item.icon" class="text-base"></Icon>
										<span class="truncate text-nowrap">{{ item.label }}</span>
									</NuxtLink>
								</li>
								<li class="w-full h-px border-b border-dashed"></li>
								<li>
									<button class="h-10 w-full flex items-center gap-2 rounded-md p-2 text-sm text-foreground/80 hover:bg-muted hover:text-destructive">
										<Icon icon="lets-icons:sign-out-circle-duotone-line" class="text-base"></Icon>
										<span class="truncate text-nowrap">Chiqish</span>
									</button>
								</li>
							</ul>
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

const route = useRoute()

const menuItems = [
	{ to: '/profile', icon: 'ph:user-duotone', label: "Shaxsiy ma'lumotlar" },
	{ to: '/profile/order-status', icon: 'ph:package-duotone', label: 'Buyurtma holati' },
	{ to: '/profile/orders', icon: 'ph:clipboard-duotone', label: 'Buyurtmalar tarixi' },
	{ to: '/profile/payments', icon: 'ph:credit-card-duotone', label: "To'lovlar" },
	{ to: '/profile/help', icon: 'ph:question-duotone', label: 'Yordam' }
]

const isActive = (path) => {
	return route.path === path
}
</script>
