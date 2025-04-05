<script setup>
definePageMeta({
	layout: 'profile'
})
</script>

<template>
	<div>
		<h1 class="section-title mb-6">Buyurtmalar tarixi</h1>
		<div class="flex flex-col gap-6">
			<article class="border border-dashed" v-for="i in 5" :key="i">
				<header class="flex-center-between min-h-12 px-4 border-b border-dashed">
					<p class="text-lg font-medium">
						Buyurtma ID raqami <span>{{ i + 1 }}</span>
					</p>
				</header>

				<div class="p-4 flex flex-col gap-4">
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Holat:</span>
						<Badge class="w-fit !bg-card-foreground text-accent">Tugallangan</Badge>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Yetkazib berish sanasi:</span>
						<span class="">Seshanba, 7 Mart 2023 22:00</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Topshirish manzili:</span>
						<span class="">Toshkent sh., Shayxontohur tumani, Zargar ko‘chasi, 5 uy (Tashkent City)</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Buyurtma sanasi:</span>
						<span class="">Seshanba, 7 Mart 2023 11:27</span>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Mahsulotlar:</span>
						<span class="">140 000 so‘m</span>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Yetkazib berish:</span>
						<span class="">20 000 so‘m</span>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-2 sm:gap-4">
						<span class="text-sm text-foreground/60">Buyurtma qiymati:</span>
						<span class="">160 000 so‘m</span>
					</div>
				</div>
				<footer class="px-4 border-t border-dashed">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>3 mahsulotlar</AccordionTrigger>
							<AccordionContent class="">
								<p class="text-base text-muted-foreground mb-2">Buyurtma ro'yxati</p>
								<ul class="flex flex-col gap-4">
									<li class="flex gap-2" v-for="i in 3" :key="i">
										<div class="w-16 h-16 overflow-hidden rounded border flex-shrink-0">
											<img src="/assets/images/product.webp" alt="" class="w-full h-full object-cover" />
										</div>
										<div class="flex flex-col lg:items-center justify-center lg:flex-row lg:justify-between gap-0.5 w-full">
											<h4 class="text-base mb-1">Норин 1 кг (без посуды)<br />1 dona</h4>
											<div class="flex flex-row-reverse lg:flex-row"><p class="w-fit font-semibold text-base">104 000 so'm</p></div>
										</div>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</footer>
			</article>
		</div>
	</div>
</template>
