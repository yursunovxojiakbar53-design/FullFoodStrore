<script setup></script>

<template>
	<div class="">
		<div class="border-dashed flex-1 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 md:gap-6">
			<aside class="sticky top-20 pb-6 pt-4 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
				<ScrollArea class="lg:border-r border-dashed relative h-full overflow-hidden pb-12 pr-6 text-sm md:pr-4">
					<ul class="flex flex-col gap-1">
						<li v-for="item in categories" :key="item.id">
							<NuxtLink to="/" class="h-8 flex items-center gap-2 rounded-md hover:bg-muted p-2 text-sm text-foreground/80 hover:text-primary">
								{{ item.title.uz }}
							</NuxtLink>
						</li>
					</ul>
				</ScrollArea>
			</aside>
			<main class="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_350px]">
				<div class="pt-10">
					<h2 class="text-xl sm:text-2xl font-bold mb-6">Oshlar</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
						<CardProduct v-for="key in 5" :key />
					</div>
				</div>
				<MainCart />
			</main>
		</div>
	</div>
</template>
