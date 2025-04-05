<script setup>
const open = ref(false);

const toggleSearch = () => {
	open.value = !open.value;
};
</script>

<template>
	<div>
		<Button @click="toggleSearch" variant="outline" class="relative w-full h-8 rounded-none justify-start lg:rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12  lg:w-56 xl:w-64">
			<span class="hidden lg:inline-flex">Mahsulotni qidirish...</span>
			<span class="inline-flex lg:hidden">Qidirish...</span>
			<kbd class="absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"> ⌘ K </kbd>
		</Button>

		<CommandDialog v-model:open="open">
			<CommandInput placeholder="Qidirish..." />
			<CommandList>
				<CommandEmpty>Natija topilmadi.</CommandEmpty>
				<CommandGroup heading="Mahsulotlar">
					<CommandItem value="profile">Osh</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	</div>
</template>
