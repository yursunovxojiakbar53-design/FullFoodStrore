<script setup>
import { useTranslate } from '~/utils/i18n-validators';
const { validPhoneNumber, minLength, requiredIf } = useTranslate();
defineProps({
	modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const step = ref(1);
const loading = ref(false);

const form = useForm(
	{
		phone: '',
		otp: ''
	},
	{
		phone: { required: requiredIf(() => step.value === 1), validPhoneNumber },
		otp: { required: requiredIf(() => step.value === 2), minLength: minLength(6) }
	}
);

const submit = () => {
	form.$v.value.$touch();
	if (!form.$v.value.$invalid) {
		if (step.value === 1) {
			sendCode();
		} else {
			verifyCode();
		}
	}
};

function sendCode() {
	step.value = 2;
}
function verifyCode() {}

function resetForm() {
	form.values.otp = '';
	form.values.phone = '';
	step.value = 1;
	emit('update:modelValue', false);0
}
</script>

<template>
	<Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
		<DialogContent class="p-4 max-w-[24rem]">
			<DialogHeader>
				<DialogTitle>Avtorizatsiya</DialogTitle>
				<DialogDescription v-if="step === 1"> Iltimos, telefon raqamingizni kiriting </DialogDescription>
				<DialogDescription v-else> Iltimos, telefon raqamingizni yuborilgan kodni kiriting </DialogDescription>
				<Button v-if="step === 2" @click="step = 1" variant="outline" class="w-fit px-2 py-1 rounded-lg text-sm gap-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
						<g fill="currentColor">
							<path d="M221.66 90.34L192 120l-56-56l29.66-29.66a8 8 0 0 1 11.31 0L221.66 79a8 8 0 0 1 0 11.34" opacity="0.2" />
							<path
								d="m227.32 73.37l-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.32l112-112a16 16 0 0 0 0-22.63M79.32 188L164 103.31L180.69 120L96 204.69ZM68 176.69L51.31 160L136 75.31L152.69 92Zm-20 2.62L76.69 208H48Zm144-70.62L147.32 64l24-24L216 84.69Z"
							/>
						</g>
					</svg>
					{{ formatPhoneNumber(form.values.phone) }}
				</Button>
			</DialogHeader>
			<Transition name="fade" mode="out-in">
				<div class="w-full flex items-center" v-if="step === 1">
					<div class="grid gap-1.5 w-full">
						<Label for="terms">Telefon raqam</Label>
						<div class="relative">
							<Input id="search" type="text" placeholder="Telefon raqamni kiriting" class="pl-12 w-full" v-maska="'## ### ## ##'" v-model="form.values.phone" :error="form.$v.value.phone.$error" />
							<span class="absolute start-0 text-sm inset-y-0 flex items-center justify-center px-2">
								<span>+998</span>
							</span>
						</div>
					</div>
				</div>
				<div v-else>
					<PinInput id="pin-input" v-model="form.values.otp" placeholder="-" @complete="handleComplete" class="w-full" type="number">
						<PinInputGroup class="w-full">
							<PinInputInput v-for="(id, index) in 6" :key="id" :index="index" class="w-full" :error="form.$v.value.otp.$error" />
						</PinInputGroup>
					</PinInput>
				</div>
			</Transition>

			<DialogFooter>
				<Button class="w-full" @click="submit" :disabled="form.$v.value.$invalid || (step === 2 && !form.values.otp)" :loading>
					<span v-if="step === 1">Davom etish</span>
					<span v-else>Tasdiqlash</span>
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
