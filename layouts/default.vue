<template>
	<div class="relative flex min-h-svh flex-col bg-background">
		<div class="border-grid flex flex-1 flex-col">
			<LayoutHeader />
			<main class="flex flex-1 flex-col mb-10">
				<div class="container flex-1">
					<slot />
				</div>
			</main>
			<LayoutFooter />
		</div>
	</div>
</template>

<script setup></script>
