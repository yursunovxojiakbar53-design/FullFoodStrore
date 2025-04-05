<script setup></script>

<template>
	<div class="mt-10 border-grid sticky top-14 h-14 z-50 w-full bg-background flex items-center">
		<div class="relative overflow-x-auto w-full no-scrollbar">
			<nav class="flex gap-4">
				<Button v-for="item in categories" :key="item" variant="secondary">
					{{ item.title.uz }}
				</Button>
			</nav>
		</div>
	</div>
</template>
