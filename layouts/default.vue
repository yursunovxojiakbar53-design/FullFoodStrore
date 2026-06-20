<template>
	<div class="relative flex min-h-svh flex-col bg-background overflow-x-hidden">
		<div class="border-grid flex flex-1 flex-col">
			<LayoutHeader />
			<main class="flex flex-1 flex-col pt-14">
				<div class="container flex-1">
					<slot />
				</div>
			</main>
			<LayoutFooter v-if="showFooter" />
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
// Menyu (bosh) sahifasida footer ko'rsatilmaydi
const showFooter = computed(() => route.path !== '/')
</script>
