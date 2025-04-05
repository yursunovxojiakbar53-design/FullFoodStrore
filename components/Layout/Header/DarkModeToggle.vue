<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
	<Button variant="ghost" size="icon" @click="toggleTheme">
		<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" class="w-4 h-4 text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<circle cx="12" cy="12" r="4"></circle>
				<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
			</g>
		</svg>
		<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" class="w-4 h-4 text-foreground absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
			<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"></path>
		</svg>
		<span class="sr-only">Toggle theme</span>
	</Button>
</template>
