<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
	<div class="mt-10">
		<div class="flex-center-between">
			<h1 class="section-title">Filiallar</h1>
		</div>
		<div class="mt-6">
			<div class="rounded-lg border bg-card p-6 max-w-[900px]">
				<div class="flex flex-col gap-5">
					<div class="flex flex-col gap-3">
						<div class="flex-between items-start flex-wrap gap-2">
							<div>
								<h3 class="text-lg font-semibold text-foreground">Buxoro</h3>
								<p class="text-sm">Buxoro shahri</p>
							</div>
							<p class="inline-flex gap-1.5 items-center text-green-500 text-sm">
								<Icon icon="ph:clock-duotone" class="w-4 h-4" />
								23:00 gacha ochiq
							</p>
						</div>
						<Separator />
						<div class="flex-between flex-wrap gap-2">
							<div class="text-sm">
								<p class="text-muted-foreground">Ish vaqti</p>
								<p class="">Du-Yak: 10:00-04:30</p>
							</div>
							<div class="text-sm">
								<p class="text-muted-foreground">Telefon raqam</p>
								<a href="tel:+998901234567" class="hover:underline">+998 90 123 45 67</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
