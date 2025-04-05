<template>
	<DropdownMenu v-model:open="open">
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" size="icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-foreground">
					<circle cx="12" cy="12" r="10" />
					<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
					<path d="M2 12h20" />
				</svg>
				<!-- <span class="text-sm capitalize max-sm:hidden">{{ currentLanguage.code }}</span> -->
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="space-y-1">
			<DropdownMenuItem v-for="(item, key) in languagesList" :key class="cursor-pointer gap-1.5 py-1.5" @click="onChangeLocale(item.code)" :class="item.code === currentLanguage.code ? 'bg-muted' : ''">
				<img :src="item.flag" alt="" class="h-4 w-4 flex-shrink-0 rounded-full" />
				<span>{{ item.name }}</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup>
import { useLanguageSwitcher } from '@/composables/useLanguageSwitcher';

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher();

const open = ref(false);

const onChangeLocale = (code) => {
	if (currentLanguage.value?.code !== code) {
		changeLocale(code);
	}
};
</script>
