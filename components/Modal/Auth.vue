<script setup>
defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'login-success'])

const authStore = useAuthStore()
const cartStore = useCartStore()
const categoriesStore = useCategoriesStore()

const tab = ref('login') // 'login' | 'register' | 'verify'
const loading = ref(false)
const errorMsg = ref('')
const pendingEmail = ref('')

const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ firstName: '', email: '', password: '', prePassword: '' })
const verifyCode = ref([])

const submitLogin = async () => {
	if (!loginForm.email || !loginForm.password) return
	loading.value = true
	errorMsg.value = ''
	const res = await authStore.login(loginForm.email, loginForm.password)
	loading.value = false
	if (res.success) {
		await cartStore.syncFromBackend()
		await categoriesStore.fetchCategories()
		emit('login-success')
		close()
	} else {
		errorMsg.value = res.message
	}
}

const submitRegister = async () => {
	if (!registerForm.firstName || !registerForm.email || !registerForm.password || !registerForm.prePassword) {
		errorMsg.value = 'Barcha maydonlarni to\'ldiring'
		return
	}
	if (registerForm.password !== registerForm.prePassword) {
		errorMsg.value = 'Parollar mos kelmaydi'
		return
	}
	if (registerForm.password.length < 6) {
		errorMsg.value = 'Parol kamida 6 ta belgi bo\'lishi kerak'
		return
	}
	loading.value = true
	errorMsg.value = ''
	const res = await authStore.register(
		registerForm.firstName, registerForm.email,
		registerForm.password, registerForm.prePassword
	)
	loading.value = false
	if (res.success) {
		pendingEmail.value = registerForm.email
		tab.value = 'verify'
	} else {
		errorMsg.value = res.message
	}
}

const submitVerify = async () => {
	const code = verifyCode.value.join('')
	if (code.length < 6) return
	loading.value = true
	errorMsg.value = ''
	const res = await authStore.verify(pendingEmail.value, code, registerForm.password)
	loading.value = false
	if (res.success) {
		await cartStore.syncFromBackend()
		await categoriesStore.fetchCategories()
		emit('login-success')
		close()
	} else {
		errorMsg.value = res.message
	}
}

const close = () => {
	tab.value = 'login'
	errorMsg.value = ''
	loading.value = false
	Object.assign(loginForm, { email: '', password: '' })
	Object.assign(registerForm, { firstName: '', email: '', password: '', prePassword: '' })
	verifyCode.value = []
	emit('update:modelValue', false)
}
</script>

<template>
	<Dialog :open="modelValue" @update:open="close">
		<DialogContent class="p-5 max-w-sm">
			<DialogHeader>
				<DialogTitle>
					{{ tab === 'verify' ? 'Email tasdiqlash' : 'Avtorizatsiya' }}
				</DialogTitle>
			</DialogHeader>

			<!-- Login / Register tabs -->
			<div v-if="tab !== 'verify'" class="flex gap-2 mb-2">
				<Button
					:variant="tab === 'login' ? 'default' : 'outline'"
					class="flex-1"
					@click="tab = 'login'; errorMsg = ''"
				>Kirish</Button>
				<Button
					:variant="tab === 'register' ? 'default' : 'outline'"
					class="flex-1"
					@click="tab = 'register'; errorMsg = ''"
				>Ro'yxatdan o'tish</Button>
			</div>

			<!-- Error -->
			<p v-if="errorMsg" class="text-sm text-red-500 rounded bg-red-50 px-3 py-2">
				{{ errorMsg }}
			</p>

			<!-- LOGIN -->
			<div v-if="tab === 'login'" class="flex flex-col gap-3">
				<div class="grid gap-1.5">
					<Label>Email</Label>
					<Input type="email" placeholder="email@gmail.com" v-model="loginForm.email" @keyup.enter="submitLogin" />
				</div>
				<div class="grid gap-1.5">
					<Label>Parol</Label>
					<Input type="password" placeholder="Parolingiz" v-model="loginForm.password" @keyup.enter="submitLogin" />
				</div>
				<Button
					class="w-full mt-1"
					@click="submitLogin"
					:disabled="loading || !loginForm.email || !loginForm.password"
				>
					{{ loading ? 'Yuklanmoqda...' : 'Kirish' }}
				</Button>
			</div>

			<!-- REGISTER -->
			<div v-if="tab === 'register'" class="flex flex-col gap-3">
				<div class="grid gap-1.5">
					<Label>Ism</Label>
					<Input type="text" placeholder="Ismingiz" v-model="registerForm.firstName" />
				</div>
				<div class="grid gap-1.5">
					<Label>Email</Label>
					<Input type="email" placeholder="email@gmail.com" v-model="registerForm.email" />
				</div>
				<div class="grid gap-1.5">
					<Label>Parol</Label>
					<Input type="password" placeholder="Kamida 6 ta belgi" v-model="registerForm.password" />
				</div>
				<div class="grid gap-1.5">
					<Label>Parolni tasdiqlang</Label>
					<Input
						type="password"
						placeholder="Parolni qaytaring"
						v-model="registerForm.prePassword"
						@keyup.enter="submitRegister"
					/>
				</div>
				<Button class="w-full mt-1" @click="submitRegister" :disabled="loading">
					{{ loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish' }}
				</Button>
			</div>

			<!-- VERIFY -->
			<div v-if="tab === 'verify'" class="flex flex-col gap-4">
				<p class="text-sm text-muted-foreground">
					<b>{{ pendingEmail }}</b> emailga tasdiqlash kodi yuborildi.
					Emailingizni tekshiring va 6 xonali kodni kiriting.
				</p>
				<PinInput id="pin-input" v-model="verifyCode" placeholder="-" type="number" class="w-full">
					<PinInputGroup class="w-full">
						<PinInputInput v-for="(_, index) in 6" :key="index" :index="index" class="w-full" />
					</PinInputGroup>
				</PinInput>
				<Button
					class="w-full"
					@click="submitVerify"
					:disabled="loading || verifyCode.join('').length < 6"
				>
					{{ loading ? 'Tekshirilmoqda...' : 'Tasdiqlash' }}
				</Button>
				<Button variant="ghost" class="w-full text-sm" @click="tab = 'register'">
					← Orqaga
				</Button>
			</div>
		</DialogContent>
	</Dialog>
</template>
