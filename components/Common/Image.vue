<template>
	<div v-lazy="src" :error-state="errorState" class="image-loading overflow-hidden">
		<img :alt="alt" class="h-full w-full object-cover" :class="imageClass" />
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

// Propsni default qiymatlar bilan belgilash
defineProps({
	src: {
		type: String
	},
	alt: {
		type: String,
		required: false,
		default: 'image'
	},
	errorState: {
		type: String,
		required: false,
		default: ''
	},
	imageClass: {
		type: [String, Array, Object],
		required: false,
		default: ''
	}
});
</script>
