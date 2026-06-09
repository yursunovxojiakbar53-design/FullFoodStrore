<script setup>
import { Icon } from '@iconify/vue';

const token = useCookie('access');
const authStore = useAuthStore()
const profileStore = useProfileStore()
const open = ref(false);

const userEmail = computed(() => profileStore.profile?.email || '')
const userInitials = computed(() => {
	const email = userEmail.value
	return email ? email.charAt(0).toUpperCase() : 'U'
})

const handleLogout = () => {
	authStore.logout()
}
</script>

<template>
	<!-- Login bo'lmagan foydalanuvchi uchun -->
	<Button
		v-if="!token"
		class="h-8 max-lg:p-0 lg:w-auto"
		variant="default"
		@click="open = true"
	>
		<span class="hidden lg:inline-flex">Kirish</span>
		<span class="inline-flex lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
				<polyline points="10 17 15 12 10 7" />
				<line x1="15" x2="3" y1="12" y2="12" />
			</svg>
		</span>
	</Button>

	<!-- Login bo'lgan foydalanuvchi uchun -->
	<DropdownMenu v-else>
		<DropdownMenuTrigger as-child>
			<Avatar class="cursor-pointer w-8 h-8">
				<AvatarFallback class="bg-primary text-primary-foreground text-sm font-semibold">
					{{ userInitials }}
				</AvatarFallback>
			</Avatar>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 mr-2">
			<div class="px-2 py-2 text-sm">
				<p class="font-semibold truncate">{{ userEmail }}</p>
			</div>
			<DropdownMenuSeparator />
			<NuxtLink to="/profile">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<Icon icon="ph:user-duotone" class="w-4 h-4" />
					<span>Shaxsiy kabinet</span>
				</DropdownMenuItem>
			</NuxtLink>
			<NuxtLink to="/profile/orders">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<Icon icon="ph:shopping-cart-duotone" class="w-4 h-4" />
					<span>Buyurtmalarim</span>
				</DropdownMenuItem>
			</NuxtLink>
			<NuxtLink to="/profile/payments">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<Icon icon="ph:credit-card-duotone" class="w-4 h-4" />
					<span>To'lovlar</span>
				</DropdownMenuItem>
			</NuxtLink>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				class="flex cursor-pointer items-center gap-x-2 text-red-500 focus:text-red-500"
				@click="handleLogout"
			>
				<Icon icon="ph:sign-out-duotone" class="w-4 h-4" />
				<span>Chiqish</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>

	<ModalAuth v-model="open" @login-success="handleLoginSuccess" />
</template>
