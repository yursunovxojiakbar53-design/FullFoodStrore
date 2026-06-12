<template>
	<div class="image-loading overflow-hidden">
		<img
			:src="imgSrc"
			:alt="alt"
			loading="lazy"
			decoding="async"
			class="h-full w-full object-cover"
			:class="imageClass"
			@error="onError"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	src: { type: String, default: '' },
	alt: { type: String, default: 'image' },
	imageClass: { type: [String, Array, Object], default: '' }
})

const FALLBACK = '/images/image.png'
const imgSrc = ref(props.src || FALLBACK)

watch(() => props.src, (val) => {
	imgSrc.value = val || FALLBACK
})

const onError = () => {
	imgSrc.value = FALLBACK
}
</script>
