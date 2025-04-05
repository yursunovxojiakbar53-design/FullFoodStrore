<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTranslate } from '~/utils/i18n-validators'

definePageMeta({
	layout: 'profile'
})

const { validPhoneNumber, minLength, required } = useTranslate()

const isEditing = ref(false) // Tahrirlash holati

const form = useForm(
	{
		firstName: '',
		lastName: '',
		middleName: '',
		phone: '',
		gender: ''
	},
	{
		phone: { required, validPhoneNumber },
		firstName: { required, minLength: minLength(3) },
		lastName: { required, minLength: minLength(3) },
		middleName: { required, minLength: minLength(3) },
		gender: { required }
	}
)
</script>

<template>
	<div>
		<h1 class="section-title mb-6">Shaxsiy ma'lumotlar</h1>
		<div class="flex-center-between flex-wrap mb-4">
			<div class="rounded-lg relative flex-y-center gap-1 flex-col">
				<div class="w-20 h-20 bg-white-150 rounded-full border border-white-100 flex flex-col items-center justify-center text-center overflow-hidden">
					<div class="relative inline-block flex-center w-full h-full bg-white-100">
						<Input id="profileImage" type="file" name="file" class="w-0 h-0 absolute" accept="image/png, image/jpeg, image/webp" />
						<div class="relative w-full h-full group">
							<label for="profileImage" class="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-300 z-20 md:opacity-0 md:group-hover:opacity-100 text-2xl text-card flex-center cursor-pointer">
								<Icon icon="mynaui:edit-one" />
							</label>
							<div class="absolute top-0 left-0 z-10 w-full h-full bg-foreground/50 transition-300 md:opacity-0 md:group-hover:opacity-100"></div>
							<div class="h-full">
								<img src="https://cdn.commeta.uz/static/review/static/front/images/default/user-default.png" alt="image" class="w-full h-full object-cover" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Button variant="outline" class="h-10 gap-1.5 font-normal" @click="isEditing = !isEditing">
				<Icon :icon="isEditing ? 'ph:x' : 'ph:pencil-duotone'" class="w-5 h-5" />
				<span> {{ isEditing ? 'Bekor qilish ' : "O'zgartirish" }} </span>
			</Button>
		</div>

		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
			<div class="grid w-full items-center gap-1.5">
				<Label for="firstName">Ism</Label>
				<Input id="firstName" v-model="form.values.firstName" placeholder="Ism" :disabled="!isEditing" />
			</div>
			<div class="grid w-full items-center gap-1.5">
				<Label for="lastName">Familiya</Label>
				<Input id="lastName" v-model="form.values.lastName" placeholder="Familiya" :disabled="!isEditing" />
			</div>
			<div class="grid w-full items-center gap-1.5">
				<Label for="middleName">Otasining ismi</Label>
				<Input id="middleName" v-model="form.values.middleName" placeholder="Otasining ismi" :disabled="!isEditing" />
			</div>
			<div class="grid w-full items-center gap-1.5">
				<Label for="phone">Telefon raqam</Label>
				<div class="relative">
					<Input id="phone" type="text" placeholder="Telefon raqamni kiriting" class="pl-12 w-full" v-maska="'## ### ## ##'" v-model="form.values.phone" :disabled="!isEditing" />
					<span class="absolute start-0 text-sm inset-y-0 flex items-center justify-center px-2">
						<span>+998</span>
					</span>
				</div>
			</div>
			<div class="grid w-full items-center gap-1.5">
				<Label for="gender">Jins</Label>
				<Select v-model="form.values.gender" :disabled="!isEditing">
					<SelectTrigger>
						<SelectValue placeholder="Jins" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="male">Erkak</SelectItem>
							<SelectItem value="female">Ayol</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>

		<div class="flex justify-end mt-4 sm:mt-6">
			<Button class="sm:max-w-52 w-full" v-if="isEditing">Saqlash</Button>
		</div>
	</div>
</template>
