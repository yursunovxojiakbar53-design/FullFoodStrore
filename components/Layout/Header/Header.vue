<script setup>
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const open = ref(false)

const cartStore = useCartStore()
const { totalPrice } = storeToRefs(cartStore)
</script>

<template>
	<header
		class="fixed top-0 left-0 right-0 z-50 w-full bg-[#faf7f2]/95 backdrop-blur-md shadow-sm shadow-black/10"
	>
		<div class="container flex h-14 items-center">
			<div class="mr-4 md:mr-1 hidden md:flex">
				<NuxtLink to="/" class="mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2 flex-shrink-0">
					<span class="text-xl font-bold">🍔 <span class="text-foreground">Food</span><span class="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">Store</span></span>
				</NuxtLink>
				<nav class="main-nav flex items-center text-sm gap-1">
					<NuxtLink to="/category" class="transition-300 text-foreground px-3 py-1.5 border-b-2 border-transparent hover:text-amber-600">{{ t('nav.categories') }}</NuxtLink>
					<NuxtLink to="/branches" class="transition-300 text-foreground px-3 py-1.5 border-b-2 border-transparent hover:text-amber-600">{{ t('nav.branches') }}</NuxtLink>
					<NuxtLink to="/about" class="transition-300 text-foreground px-3 py-1.5 border-b-2 border-transparent hover:text-amber-600">{{ t('nav.about') }}</NuxtLink>
					<NuxtLink to="/contacts" class="transition-300 text-foreground px-3 py-1.5 border-b-2 border-transparent hover:text-amber-600">{{ t('nav.contact') }}</NuxtLink>
				</nav>
			</div>
			<Button @click="open = true" class="md:hidden mr-2" variant="ghost" size="icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
					<line x1="4" x2="20" y1="12" y2="12" />
					<line x1="4" x2="20" y1="6" y2="6" />
					<line x1="4" x2="20" y1="18" y2="18" />
				</svg>
			</Button>
			<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
				<div class="w-full flex-1 md:w-auto md:flex-none">
					<LayoutHeaderSearch class="hidden lg:block" />
				</div>
				<nav class="flex items-center gap-1">
					<LayoutHeaderLanguageSwitcher />
					<LayoutHeaderDarkModeToggle />
					<NuxtLink to="/cart">
						<Button variant="secondary" size="icon" class="w-auto px-3 !bg-gradient-to-r !from-amber-400 !to-yellow-500 !text-amber-950">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_5392_59026)">
									<path
										d="M2.15504 8.33333H17.8437M15.0286 5L4.97007 5C2.87771 5 1.31263 6.93854 1.73528 9.00666L3.09772 15.6733C3.41424 17.2221 4.76553 18.3333 6.3325 18.3333H13.6662C15.2332 18.3333 16.5845 17.2221 16.901 15.6733L18.2634 9.00666C18.6861 6.93853 17.121 5 15.0286 5Z"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path d="M7.5 1.66667L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									<path d="M12.5 1.66667L15 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									<path d="M7.5 11.6667L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									<path d="M12.5 11.6667L12.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
								</g>
								<defs>
									<clipPath id="clip0_5392_59026"><rect width="20" height="20" fill="white"></rect></clipPath>
								</defs>
							</svg>
							<span class="leading-4">{{ formatPrice(totalPrice) }} <span class="hidden sm:inline-flex">{{ t('common.currency') }}</span></span>
						</Button>
					</NuxtLink>
					<LayoutHeaderAuthorization />
				</nav>
			</div>
		</div>
		<LayoutHeaderSearch class="lg:hidden block" />
	</header>
	<Sheet v-model:open="open">
		<SheetContent side="left">
			<SheetHeader>
				<NuxtLink to="/" class="mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2">
					<span class="text-xl font-bold">🍔 <span class="text-foreground">Food</span><span class="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">Store</span></span>
				</NuxtLink>
			</SheetHeader>
			<ScrollArea class="relative overflow-hidden my-4 h-[calc(100vh-8rem)] pb-10">
				<nav class="flex flex-col gap-4 text-sm xl:gap-6">
					<NuxtLink to="/category" class="transition-colors hover:text-foreground/80 text-foreground">{{ t('nav.categories') }}</NuxtLink>
					<NuxtLink to="/branches" class="transition-colors hover:text-foreground/80 text-foreground">{{ t('nav.branches') }}</NuxtLink>
					<NuxtLink to="/about" class="transition-colors hover:text-foreground/80 text-foreground">{{ t('nav.about') }}</NuxtLink>
					<NuxtLink to="/contacts" class="transition-colors hover:text-foreground/80 text-foreground">{{ t('nav.contact') }}</NuxtLink>
				</nav>
			</ScrollArea>
		</SheetContent>
	</Sheet>
</template>

<style scoped>
/* Aktiv bo'lim — gold rang + tag chiziq */
.main-nav .router-link-active {
	color: #ca8a04;
	font-weight: 600;
	border-bottom-color: #eab308;
}
</style>
