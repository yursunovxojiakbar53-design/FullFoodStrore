<script setup>
import { Icon } from '@iconify/vue';

const token = useCookie('access');
const open = ref(false);
</script>

<template>
	<Button class="h-8 w-8 max-lg:p-0 lg:w-auto" v-if="token" @click="open = true">
		<span class="hidden lg:inline-flex">Kirish</span>
		<span class="inline-flex lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in">
				<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
				<polyline points="10 17 15 12 10 7" />
				<line x1="15" x2="3" y1="12" y2="12" />
			</svg>
		</span>
	</Button>
	<ModalAuth v-model="open" />
	<DropdownMenu v-if="!token">
		<DropdownMenuTrigger as-child>
			<Avatar class="cursor-pointer w-8 h-8">
				<AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
			</Avatar>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-64 mb-6">
			<div class="px-2 py-1.5 text-sm font-semibold">
				<div class="relative mb-2 flex flex-col items-center justify-center gap-y-3 rounded-md bg-muted pb-5 pt-7">
					<Avatar>
						<AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div class="flex flex-col items-center justify-center"><span class="text-sm font-medium">+998930819140</span><span class="text-xs text-muted-foreground"> Sanoyev Og'abek Otabek o'g'li</span></div>
				</div>
			</div>
			<NuxtLink to="/profile">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" font-size="16" width="1em" height="1em" viewBox="0 0 256 256">
						<g fill="currentColor">
							<path d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64" opacity=".2"></path>
							<path
								d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"
							></path>
						</g>
					</svg>
					<span>Shaxsiy</span>
				</DropdownMenuItem>
			</NuxtLink>
			<NuxtLink to="/payments">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<Icon icon="ph:shopping-cart-duotone" class="" />
					<span>Buyurtmalarim</span>
				</DropdownMenuItem>
			</NuxtLink>
			<NuxtLink to="/payments">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide" font-size="16" width="1em" height="1em" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<rect width="20" height="14" x="2" y="5" rx="2"></rect>
							<path d="M2 10h20"></path>
						</g>
					</svg>
					<span>To'lovlar</span>
				</DropdownMenuItem>
			</NuxtLink>
			<NuxtLink to="/">
				<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconamoon" font-size="16" width="1em" height="1em" viewBox="0 0 24 24">
						<g fill="none">
							<circle cx="12" cy="12" r="9" fill="currentColor" opacity=".16"></circle>
							<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
							<path stroke="currentColor" stroke-linejoin="round" stroke-width="3" d="M12 16h.01v.01H12z"></path>
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.586 7.586c.39-.39.9-.585 1.41-.586a2 2 0 0 1 1.418.586c.39.39.586.902.586 1.414s-.195 1.024-.586 1.414a2 2 0 0 1-1.418.586L12 12"></path>
						</g>
					</svg>
					<span>Yordam</span>
				</DropdownMenuItem>
			</NuxtLink>
			<DropdownMenuSeparator />
			<DropdownMenuItem class="flex cursor-pointer items-center gap-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lets-icons" font-size="16" width="1em" height="1em" viewBox="0 0 24 24">
					<defs>
						<mask id="iconifyReact51">
							<g fill="none">
								<circle cx="6" cy="6" r="6" fill="#fff" fill-opacity=".25" transform="matrix(0 -1 -1 0 20 18)"></circle>
								<path stroke="silver" stroke-opacity=".25" stroke-width=".6" d="M7.7 12a6.3 6.3 0 1 1 12.6 0a6.3 6.3 0 0 1-12.6 0Z"></path>
								<path stroke="#fff" stroke-width="1.2" d="M8 18.928A8 8 0 1 0 8 5.072"></path>
								<path fill="#fff" d="m2 12l-.469-.375l-.3.375l.3.375zm9 .6a.6.6 0 1 0 0-1.2zM5.531 6.625l-4 5l.938.75l4-5zm-4 5.75l4 5l.938-.75l-4-5zM2 12.6h9v-1.2H2z"></path>
							</g>
						</mask>
					</defs>
					<path fill="currentColor" d="M0 0h24v24H0z" mask="url(#iconifyReact51)"></path>
				</svg>
				<span>Chiqish</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
