<script setup>
import { Icon } from '@iconify/vue'
import { useTranslate } from '~/utils/i18n-validators'

definePageMeta({
	layout: 'profile',
	middleware: 'auth'
})

const { validPhoneNumber, minLength, required } = useTranslate()
const api = useApi()
const profileStore = useProfileStore()

const saved = ref(false)
const me = ref(null)
const ordersCount = ref(0)
const wishlistCount = ref(0)

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

const STORAGE_KEY = 'foodstore_profile'

onMounted(async () => {
	// Tahrirlanadigan maydonlarni (localStorage) tiklash
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (raw) Object.assign(form.values, JSON.parse(raw))
	} catch {}

	// Login qilgan foydalanuvchi bo'yicha real ma'lumot
	const [meRes, ordersRes, wishRes] = await Promise.allSettled([
		api.get('/api/v1/users/me'),
		api.get('/api/v1/orders/my'),
		api.get('/api/v1/wishlists')
	])
	if (meRes.status === 'fulfilled') {
		me.value = api.unwrap(meRes.value)
		if (!form.values.firstName && me.value?.name) form.values.firstName = me.value.name
	}
	if (ordersRes.status === 'fulfilled') ordersCount.value = api.extractList(ordersRes.value).length
	if (wishRes.status === 'fulfilled') wishlistCount.value = api.extractList(wishRes.value).length
})

const email = computed(() => me.value?.email || profileStore.profile?.email || '')
const accountType = computed(() => {
	const roles = (profileStore.profile?.roles || []).map((r) => String(r?.role || r?.authority || r))
	if (roles.some((r) => r.includes('SUPER_ADMIN'))) return 'Super Admin'
	if (roles.some((r) => r.includes('ADMIN'))) return 'Administrator'
	return 'Oddiy foydalanuvchi'
})

const regDate = computed(() => {
	const d = me.value?.createdAt
	if (!d) return '—'
	try {
		return new Date(d).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })
	} catch {
		return '—'
	}
})

const accountStats = computed(() => [
	{ icon: 'ph:user-circle-duotone', label: 'Hisob turi', value: accountType.value },
	{ icon: 'ph:calendar-duotone', label: "Ro'yxatdan o'tgan sana", value: regDate.value },
	{ icon: 'ph:shopping-cart-duotone', label: 'Jami buyurtmalar', value: ordersCount.value + ' ta' },
	{ icon: 'ph:heart-duotone', label: 'Sevimli taomlar', value: wishlistCount.value + ' ta' }
])

const save = () => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form.values }))
	} catch {}
	saved.value = true
	setTimeout(() => (saved.value = false), 2500)
}

const changePassword = () => {
	alert("Parolni o'zgartirish funksiyasi tez orada qo'shiladi.")
}
</script>

<template>
	<div>
		<!-- Sahifa sarlavhasi -->
		<div class="mb-6 flex items-start justify-between gap-4">
			<div>
				<h1 class="text-2xl font-bold">Mening profilim</h1>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
					<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
					Shaxsiy ma'lumotlaringizni tahrirlang
				</p>
			</div>
			<div class="hidden h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary sm:grid">
				<Icon icon="ph:identification-card-duotone" class="h-8 w-8" />
			</div>
		</div>

		<div class="grid gap-6 lg:grid-cols-[1fr_300px]">
			<!-- CHAP: forma -->
			<div class="rounded-2xl border bg-card p-6 shadow-sm">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<h2 class="text-lg font-bold">Shaxsiy ma'lumotlar</h2>
					<button type="button" class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition hover:bg-muted" @click="changePassword">
						<Icon icon="ph:lock-duotone" class="h-4 w-4" />
						Parolni o'zgartirish
					</button>
				</div>

				<!-- Avatar -->
				<div class="my-6">
					<div class="relative h-20 w-20">
						<div class="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-white">
							<Icon icon="ph:user-duotone" class="h-10 w-10" />
						</div>
						<label for="profileImage" class="absolute -bottom-1 -right-1 grid h-7 w-7 cursor-pointer place-items-center rounded-full border-2 border-card bg-primary text-white shadow">
							<Icon icon="ph:camera-duotone" class="h-4 w-4" />
						</label>
						<Input id="profileImage" type="file" name="file" class="hidden" accept="image/png, image/jpeg, image/webp" />
					</div>
				</div>

				<!-- Maydonlar -->
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div class="grid w-full items-center gap-1.5">
						<Label for="firstName">Ism</Label>
						<Input id="firstName" v-model="form.values.firstName" placeholder="Ism" />
					</div>
					<div class="grid w-full items-center gap-1.5">
						<Label for="lastName">Familiya</Label>
						<Input id="lastName" v-model="form.values.lastName" placeholder="Familiya" />
					</div>
					<div class="grid w-full items-center gap-1.5">
						<Label for="middleName">Otasining ismi</Label>
						<Input id="middleName" v-model="form.values.middleName" placeholder="Otasining ismi" />
					</div>
				</div>

				<div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div class="grid w-full items-center gap-1.5">
						<Label for="phone">Telefon raqam</Label>
						<div class="relative">
							<Input id="phone" type="text" placeholder="Telefon raqamini kiriting" class="w-full pl-12" v-maska="'## ### ## ##'" v-model="form.values.phone" />
							<span class="absolute inset-y-0 start-0 flex items-center justify-center px-2 text-sm text-muted-foreground">+998</span>
						</div>
					</div>
					<div class="grid w-full items-center gap-1.5">
						<Label for="gender">Jins</Label>
						<Select v-model="form.values.gender">
							<SelectTrigger>
								<SelectValue placeholder="Jinsni tanlang" />
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

				<!-- Saqlandi xabari -->
				<div v-if="saved" class="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
					<Icon icon="ph:check-circle-duotone" class="h-5 w-5" />
					Ma'lumotlaringiz saqlandi
				</div>

				<!-- Xavfsizlik banneri -->
				<div class="mt-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3">
					<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
						<Icon icon="ph:shield-check-duotone" class="h-5 w-5" />
					</span>
					<div class="flex-1">
						<p class="text-sm font-semibold">Ma'lumotlaringiz xavfsiz</p>
						<p class="text-xs text-muted-foreground">Shaxsiy ma'lumotlaringiz bizning maxfiylik siyosatimiz asosida himoyalanadi.</p>
					</div>
					<Icon icon="ph:caret-right" class="h-5 w-5 shrink-0 text-muted-foreground" />
				</div>
			</div>

			<!-- O'NG: hisob haqida -->
			<div class="h-fit rounded-2xl border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-bold">Hisobingiz haqida</h2>
					<Icon icon="ph:crown-duotone" class="h-6 w-6 text-amber-500" />
				</div>
				<div class="mt-5 space-y-5">
					<div v-for="stat in accountStats" :key="stat.label" class="flex items-center gap-3">
						<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70">
							<Icon :icon="stat.icon" class="h-5 w-5" />
						</span>
						<div>
							<p class="text-xs text-muted-foreground">{{ stat.label }}</p>
							<p class="text-sm font-medium">{{ stat.value }}</p>
						</div>
					</div>
				</div>
				<div class="mt-6 rounded-lg bg-amber-50 px-4 py-2.5 text-center text-sm font-medium text-amber-700">
					Faolligingiz uchun rahmat! 🙌
				</div>
			</div>
		</div>

		<!-- Saqlash -->
		<div class="mt-6 flex justify-end">
			<Button class="gap-2 px-8" @click="save">
				<Icon icon="ph:check-bold" class="h-4 w-4" />
				Saqlash
			</Button>
		</div>
	</div>
</template>
