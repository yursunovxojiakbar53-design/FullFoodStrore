<script setup>
import { Boxes, CheckCircle2, FolderTree, Image, LayoutDashboard, LogOut, MapPin, PackagePlus, Plus, Settings, ShoppingBag, Tag, Users, XCircle } from 'lucide-vue-next'

definePageMeta({
	middleware: 'admin',
	layout: false
})

const api = useApi()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const adminEmail = computed(() => profileStore.profile?.email || '')
const adminInitial = computed(() => adminEmail.value.charAt(0).toUpperCase() || 'A')

async function handleLogout() {
	authStore.logout()
	await navigateTo('/')
}

const sections = [
	{ key: 'products', label: 'Products', icon: Boxes },
	{ key: 'categories', label: 'Categories', icon: FolderTree },
	{ key: 'orders', label: 'Orders', icon: ShoppingBag },
	{ key: 'settings', label: 'Settings', icon: Settings }
]

const settingsTabs = [
	{ key: 'users', label: 'Foydalanuvchilar', icon: Users },
	{ key: 'branches', label: 'Filiallar', icon: MapPin },
	{ key: 'carousel', label: 'Carousel', icon: Image },
	{ key: 'coupons', label: 'Kuponlar', icon: Tag }
]

const orderStatuses = ['NEW', 'PROCESSING', 'DELIVERED', 'CANCELLED']
const userRoles = ['ROLE_USER', 'ROLE_OPERATOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']

const activeSection = ref('products')
const activeSettingsTab = ref('users')
const loading = ref(false)
const settingsLoading = ref(false)
const usersLoading = ref(false)
const usersError = ref('')
const error = ref('')
const products = ref([])
const categories = ref([])
const orders = ref([])
const users = ref([])
const branches = ref([])
const carouselItems = ref([])
const coupons = ref([])

const modal = reactive({ open: false, type: '', mode: 'create' })
const settingsModal = reactive({ open: false, type: '', mode: 'create' })
const productForm = reactive(emptyProduct())
const categoryForm = reactive(emptyCategory())
const branchForm = reactive(emptyBranch())
const carouselForm = reactive(emptyCarousel())
const couponForm = reactive(emptyCoupon())

onMounted(async () => {
	await refreshAll()
})

watch(activeSection, async (val) => {
	if (val === 'settings') {
		fetchUsers()
		refreshSettings()
	}
})

watch(activeSettingsTab, (val) => {
	if (val === 'users' && !users.value.length && !usersLoading.value) fetchUsers()
})

const pageTitle = computed(() => sections.find((item) => item.key === activeSection.value)?.label || 'Admin')

// ── Empty form factories ────────────────────────────────────────────────────

function emptyProduct() {
	return {
		id: null,
		nameUz: '',
		nameRu: '',
		nameEng: '',
		descriptionUz: '',
		descriptionRu: '',
		descriptionEn: '',
		price: 0,
		discountPrice: 0,
		currentPrice: 0,
		weight: 0,
		categoryId: null,
		stockQuantity: 0,
		isAvailable: true,
		attachmentId: null
	}
}

function emptyCategory() {
	return {
		id: null,
		nameUz: '',
		nameRu: '',
		nameEng: '',
		descriptionUz: '',
		descriptionRu: '',
		descriptionEn: '',
		orderId: null,
		active: true,
		telegramSticker: '-',
		telegramDescription: '',
		attachmentId: null
	}
}

function emptyBranch() {
	return { id: null, title: '', description: '', workHours: '', phoneNumber: '', latitude: null, longitude: null }
}

function emptyCarousel() {
	return { id: null, title: '', description: '', imageUrl: '', isActive: true, orderIndex: 0 }
}

function emptyCoupon() {
	return { id: null, code: '', discountPercent: 0, minOrderAmount: 0, maxUses: null, isActive: true, expiresAt: '' }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function assignForm(target, source) {
	Object.keys(target).forEach((key) => {
		target[key] = source[key] ?? target[key]
	})
}

function productPayload() {
	return {
		...productForm,
		price: Number(productForm.price || 0),
		discountPrice: Number(productForm.discountPrice || 0),
		currentPrice: Number(productForm.currentPrice || productForm.price || 0),
		weight: Number(productForm.weight || 0),
		categoryId: Number(productForm.categoryId),
		stockQuantity: Number(productForm.stockQuantity || 0),
		attachmentId: productForm.attachmentId ? Number(productForm.attachmentId) : null
	}
}

function categoryPayload() {
	return {
		...categoryForm,
		orderId: categoryForm.orderId ? Number(categoryForm.orderId) : null,
		active: Boolean(categoryForm.active),
		telegramSticker: categoryForm.telegramSticker || '-',
		attachmentId: categoryForm.attachmentId ? Number(categoryForm.attachmentId) : null
	}
}

// ── Fetch ────────────────────────────────────────────────────────────────────

async function refreshAll() {
	loading.value = true
	error.value = ''
	try {
		await Promise.all([fetchProducts(), fetchCategories(), fetchOrders()])
	} catch (err) {
		error.value = api.errorMessage(err, 'Admin data yuklanmadi')
	} finally {
		loading.value = false
	}
}

async function refreshSettings() {
	settingsLoading.value = true
	await Promise.allSettled([fetchBranches(), fetchCarousel(), fetchCoupons()])
	settingsLoading.value = false
}

async function fetchProducts() {
	const res = await api.get('/admin/products', { query: { page: 0, size: 100 } })
	products.value = api.extractList(res)
}

async function fetchCategories() {
	const res = await api.get('/admin/categories', { query: { page: 0, size: 100 } })
	categories.value = api.extractList(res)
}

async function fetchOrders() {
  const res = await api.get('/admin/orders', { query: { page: 0, size: 100 } })
  orders.value = res?.data?.content || res?.data || []
}

async function fetchUsers() {
	usersLoading.value = true
	usersError.value = ''
	try {
		const res = await api.get('/api/v1/admin/users', { query: { page: 0, size: 100 } })
		console.log('USERS RAW:', JSON.stringify(res))
		if (Array.isArray(res)) {
			users.value = res
		} else if (Array.isArray(res?.data?.content)) {
			users.value = res.data.content
		} else if (Array.isArray(res?.data)) {
			users.value = res.data
		} else if (Array.isArray(res?.content)) {
			users.value = res.content
		} else {
			users.value = []
			usersError.value = 'Unexpected response: ' + JSON.stringify(res)
		}
	} catch (err) {
		usersError.value = err?.data?.message || err?.message || 'Foydalanuvchilar yuklanmadi'
		users.value = []
	} finally {
		usersLoading.value = false
	}
}

async function fetchBranches() {
	try {
		const res = await api.get('/api/filials')
		console.log('FILIALS RAW:', JSON.stringify(res))
		if (Array.isArray(res)) branches.value = res
		else if (Array.isArray(res?.data?.content)) branches.value = res.data.content
		else if (Array.isArray(res?.data)) branches.value = res.data
		else branches.value = []
	} catch (err) {
		console.error('FILIALS ERROR:', err)
		branches.value = []
	}
}

async function fetchCarousel() {
	const res = await api.get('/api/v1/secure/carousel')
	carouselItems.value = api.extractList(res)
}

async function fetchCoupons() {
	const res = await api.get('/api/v1/coupons')
	coupons.value = api.extractList(res)
}

// ── Products ─────────────────────────────────────────────────────────────────

function openProduct(item = null) {
	Object.assign(productForm, emptyProduct())
	if (item) {
		assignForm(productForm, {
			...item,
			categoryId: item.categoryId || item.category?.id,
			attachmentId: item.attachmentId || item.attachment?.id,
			descriptionEn: item.descriptionEn || item.descriptionEng
		})
	}
	modal.open = true
	modal.type = 'product'
	modal.mode = item ? 'edit' : 'create'
}

function openCategory(item = null) {
	Object.assign(categoryForm, emptyCategory())
	if (item) {
		assignForm(categoryForm, {
			...item,
			active: item.active ?? item.status ?? true,
			attachmentId: item.attachmentId || item.attachment?.id
		})
	}
	modal.open = true
	modal.type = 'category'
	modal.mode = item ? 'edit' : 'create'
}

function closeModal() {
	modal.open = false
	modal.type = ''
}

async function saveProduct() {
	if (!productForm.categoryId) {
		error.value = 'Product category tanlang'
		return
	}
	const payload = productPayload()
	if (modal.mode === 'edit') await api.put(`/admin/products/${productForm.id}`, payload)
	else await api.post('/admin/products', payload)
	closeModal()
	await fetchProducts()
}

async function saveCategory() {
	const payload = categoryPayload()
	if (modal.mode === 'edit') await api.put(`/admin/categories/${categoryForm.id}`, payload)
	else await api.post('/admin/categories', payload)
	closeModal()
	await fetchCategories()
}

async function deleteProduct(id) {
	await api.del(`/admin/products/${id}`)
	await fetchProducts()
}

async function deleteCategory(id) {
	await api.del(`/admin/categories/${id}`)
	await fetchCategories()
}

// ── Orders ───────────────────────────────────────────────────────────────────

async function changeOrderStatus(order, status) {
	await api.put(`/admin/orders/${order.id}/status`, null, { query: { status } })
	order.orderStatus = status
}

function statusClass(status) {
	const tone = {
		NEW: 'bg-blue-500/15 text-blue-400',
		PROCESSING: 'bg-amber-500/15 text-amber-400',
		DELIVERED: 'bg-emerald-500/15 text-emerald-400',
		CANCELLED: 'bg-red-500/15 text-red-400',
		CANCELED: 'bg-red-500/15 text-red-400'
	}
	return tone[status] || 'bg-slate-600/30 text-slate-400'
}

// ── Settings: Users ──────────────────────────────────────────────────────────

// Backend user obyektida rol "role" (Set<UserRole>) sifatida keladi
function userRole(user) {
	const set = Array.isArray(user.role) ? user.role : (Array.isArray(user.roles) ? user.roles : null)
	if (set && set.length) {
		const first = set[0]
		if (typeof first === 'string') return first
		return first?.role || first?.authority || '-'
	}
	if (typeof user.role === 'string') return user.role
	return '-'
}

// O'zini o'zgartira olmaydi (lockout bo'lmasligi uchun)
function isSelf(user) {
	return !!user.email && user.email === profileStore.profile?.email
}

async function changeUserRole(user, newRole) {
	if (!newRole || newRole === userRole(user)) return
	const label = newRole.replace('ROLE_', '')
	if (!confirm(`Rolni "${label}" ga o'zgartirmoqchimisiz?`)) {
		await fetchUsers() // bekor qilinsa select holatini tiklash
		return
	}
	try {
		await api.put(`/api/v1/changeRole/${user.id}`, null, { query: { role: newRole } })
		await fetchUsers()
	} catch (err) {
		alert('Role o\'zgartirishda xatolik: ' + (err?.data?.message || err?.message || 'So\'rov bajarilmadi'))
		await fetchUsers()
	}
}

async function toggleUserEnabled(user) {
	const isBlocking = user.enabled !== false
	const msg = isBlocking
		? 'Ushbu foydalanuvchini bloklamoqchimisiz? Bloklangan foydalanuvchi buyurtma bera olmaydi.'
		: 'Ushbu foydalanuvchini blokdan chiqarmoqchimisiz?'
	if (!confirm(msg)) return
	try {
		await api.put(`/api/v1/admin/users/${user.id}/block`, null, { query: { blocked: isBlocking } })
		user.enabled = !isBlocking
	} catch (err) {
		alert('Xatolik: ' + (err?.data?.message || err?.message || 'So\'rov bajarilmadi'))
	}
}

// ── Settings: Branches ───────────────────────────────────────────────────────

function openBranch(item = null) {
	Object.assign(branchForm, emptyBranch())
	if (item) assignForm(branchForm, item)
	settingsModal.open = true
	settingsModal.type = 'branch'
	settingsModal.mode = item ? 'edit' : 'create'
}

async function saveBranch() {
	try {
		const payload = {
			title: branchForm.title,
			description: branchForm.description || '',
			workHours: branchForm.workHours || '',
			phoneNumber: branchForm.phoneNumber || '',
			latitude: branchForm.latitude ? Number(branchForm.latitude) : null,
			longitude: branchForm.longitude ? Number(branchForm.longitude) : null,
		}
		console.log('SAVING FILIAL:', JSON.stringify(payload))
		if (settingsModal.mode === 'edit') {
			await api.put(`/api/filials/${branchForm.id}`, payload)
		} else {
			await api.post('/api/filials', payload)
		}
		closeSettingsModal()
		await fetchBranches()
	} catch (err) {
		console.error('FILIAL SAVE ERROR:', err)
		alert('Saqlashda xatolik: ' + (err?.data?.message || err?.message || JSON.stringify(err)))
	}
}

async function deleteBranch(id) {
	if (!confirm("Ushbu filialni o'chirishni tasdiqlaysizmi?")) return
	try {
		await api.del(`/api/filials/${id}`)
		await fetchBranches()
	} catch (err) {
		alert('Xatolik: ' + (err?.data?.message || err?.message || 'O\'chirish muvaffaqiyatsiz'))
	}
}

// ── Settings: Carousel ───────────────────────────────────────────────────────

function openCarousel(item = null) {
	Object.assign(carouselForm, emptyCarousel())
	if (item) assignForm(carouselForm, item)
	settingsModal.open = true
	settingsModal.type = 'carousel'
	settingsModal.mode = item ? 'edit' : 'create'
}

async function saveCarousel() {
	if (settingsModal.mode === 'edit') await api.put(`/api/v1/secure/carousel/${carouselForm.id}`, carouselForm)
	else await api.post('/api/v1/secure/carousel', carouselForm)
	closeSettingsModal()
	await fetchCarousel()
}

async function deleteCarousel(id) {
	if (!confirm("Ushbu carousel elementini o'chirishni tasdiqlaysizmi?")) return
	try {
		await api.del(`/api/v1/secure/carousel/${id}`)
		await fetchCarousel()
	} catch (err) {
		alert('Xatolik: ' + (err?.data?.message || err?.message || 'O\'chirish muvaffaqiyatsiz'))
	}
}

// ── Settings: Coupons ────────────────────────────────────────────────────────

function openCoupon(item = null) {
	Object.assign(couponForm, emptyCoupon())
	if (item) assignForm(couponForm, item)
	settingsModal.open = true
	settingsModal.type = 'coupon'
	settingsModal.mode = item ? 'edit' : 'create'
}

async function saveCoupon() {
	if (settingsModal.mode === 'edit') await api.put(`/api/v1/coupons/${couponForm.id}`, couponForm)
	else await api.post('/api/v1/coupons', couponForm)
	closeSettingsModal()
	await fetchCoupons()
}

async function deleteCoupon(id) {
	if (!confirm("Ushbu kuponni o'chirishni tasdiqlaysizmi?")) return
	try {
		await api.del(`/api/v1/coupons/${id}`)
		await fetchCoupons()
	} catch (err) {
		alert('Xatolik: ' + (err?.data?.message || err?.message || 'O\'chirish muvaffaqiyatsiz'))
	}
}

function closeSettingsModal() {
	settingsModal.open = false
	settingsModal.type = ''
}

// ── Image upload ─────────────────────────────────────────────────────────────

const uploadingProductImage = ref(false)
const uploadingCategoryImage = ref(false)
const productImageError = ref('')
const categoryImageError = ref('')

async function uploadImage(file) {
	const formData = new FormData()
	formData.append('file', file)
	const res = await fetch(`${api.backendBase}/api/v1/files/upload`, {
		method: 'POST',
		headers: api.token.value ? { Authorization: `Bearer ${api.token.value}` } : {},
		body: formData
	})
	if (!res.ok) throw new Error('Upload failed: ' + res.status)
	const json = await res.json()
	return json?.data || json
}

async function onProductImageChange(event) {
	const file = event.target.files?.[0]
	if (!file) return
	uploadingProductImage.value = true
	productImageError.value = ''
	try {
		const data = await uploadImage(file)
		productForm.attachmentId = data?.id ?? data?.attachmentId ?? null
	} catch (err) {
		productImageError.value = 'Rasm yuklanmadi. Qayta urinib ko\'ring.'
	} finally {
		uploadingProductImage.value = false
	}
}

async function onCategoryImageChange(event) {
	const file = event.target.files?.[0]
	if (!file) return
	uploadingCategoryImage.value = true
	categoryImageError.value = ''
	try {
		const data = await uploadImage(file)
		categoryForm.attachmentId = data?.id ?? data?.attachmentId ?? null
	} catch (err) {
		categoryImageError.value = 'Rasm yuklanmadi. Qayta urinib ko\'ring.'
	} finally {
		uploadingCategoryImage.value = false
	}
}
</script>

<template>
	<div class="min-h-screen bg-slate-900 text-slate-100">
		<div class="grid min-h-screen lg:grid-cols-[300px_1fr]">
			<aside class="flex flex-col border-r border-slate-700/60 bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 px-5 py-6">
				<!-- Logo -->
				<div class="mb-8 flex items-center gap-3 px-1">
					<div class="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white shadow-inner">
						<LayoutDashboard class="h-5 w-5" />
					</div>
					<div>
						<p class="text-xs font-medium uppercase tracking-widest text-emerald-300">FoodStore</p>
						<h1 class="text-lg font-bold text-white">Admin Panel</h1>
					</div>
				</div>

				<!-- Nav -->
				<nav class="flex-1 space-y-1">
					<button
						v-for="item in sections"
						:key="item.key"
						class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all"
						:class="activeSection === item.key
							? 'bg-white text-emerald-900 shadow-md'
							: 'text-emerald-100 hover:bg-white/10 hover:text-white'"
						@click="activeSection = item.key"
					>
						<component :is="item.icon" class="h-5 w-5 shrink-0" />
						{{ item.label }}
					</button>
				</nav>

				<!-- Admin info + Logout -->
				<div class="mt-6 border-t border-white/10 pt-5">
					<div class="mb-4 flex items-center gap-3 px-1">
						<div class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
							{{ adminInitial }}
						</div>
						<div class="min-w-0">
							<p class="truncate text-sm font-medium text-white">{{ adminEmail || 'Admin' }}</p>
							<p class="text-xs text-emerald-300">Super Admin</p>
						</div>
					</div>
					<button
						class="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/15 hover:text-red-200"
						@click="handleLogout"
					>
						<LogOut class="h-4 w-4 shrink-0" />
						Chiqish (Logout)
					</button>
				</div>
			</aside>

			<main class="min-w-0 p-4 sm:p-6">
				<header class="mb-5 flex flex-col gap-3 border-b border-slate-700 pb-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p class="text-sm text-slate-400">Dashboard</p>
						<h2 class="text-2xl font-bold text-white">{{ pageTitle }}</h2>
					</div>
					<button
						v-if="activeSection === 'products'"
						class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
						@click="openProduct()"
					>
						<PackagePlus class="h-4 w-4" />
						Add product
					</button>
					<button
						v-else-if="activeSection === 'categories'"
						class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
						@click="openCategory()"
					>
						<FolderTree class="h-4 w-4" />
						Add category
					</button>
				</header>

				<div v-if="error" class="mb-4 rounded-lg border border-red-800/40 bg-red-900/20 px-4 py-3 text-sm text-red-400">
					{{ error }}
				</div>

				<div v-if="loading" class="rounded-lg border border-slate-700 bg-slate-800 p-6 text-sm text-slate-400">Loading...</div>

				<!-- Products -->
				<section v-else-if="activeSection === 'products'" class="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[760px] text-sm">
							<thead class="border-b border-slate-700 bg-slate-700 text-left text-slate-300">
								<tr>
									<th class="px-4 py-3 font-semibold">Name</th>
									<th class="px-4 py-3 font-semibold">Category</th>
									<th class="px-4 py-3 font-semibold">Price</th>
									<th class="px-4 py-3 font-semibold">Stock</th>
									<th class="px-4 py-3 font-semibold">Status</th>
									<th class="px-4 py-3 text-right font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-700">
								<tr v-for="product in products" :key="product.id" class="transition hover:bg-slate-700/60">
									<td class="px-4 py-3 font-medium text-white">{{ product.nameUz || product.name }}</td>
									<td class="px-4 py-3 text-slate-400">{{ product.category?.nameUz || '-' }}</td>
									<td class="px-4 py-3 text-slate-200">{{ product.currentPrice || product.price }} so'm</td>
									<td class="px-4 py-3 text-slate-200">{{ product.stockQuantity ?? 0 }}</td>
									<td class="px-4 py-3">
										<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium" :class="product.available !== false ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'">
											<CheckCircle2 v-if="product.available !== false" class="h-3 w-3" />
											<XCircle v-else class="h-3 w-3" />
											{{ product.available !== false ? 'Active' : 'Inactive' }}
										</span>
									</td>
									<td class="px-4 py-3 text-right">
										<button class="rounded-md px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white" @click="openProduct(product)">Edit</button>
										<button class="rounded-md px-3 py-1.5 text-red-400 hover:bg-red-500/15" @click="deleteProduct(product.id)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<!-- Categories -->
				<section v-else-if="activeSection === 'categories'" class="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[640px] text-sm">
							<thead class="border-b border-slate-700 bg-slate-700 text-left text-slate-300">
								<tr>
									<th class="px-4 py-3 font-semibold">Name</th>
									<th class="px-4 py-3 font-semibold">Order</th>
									<th class="px-4 py-3 font-semibold">Status</th>
									<th class="px-4 py-3 text-right font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-700">
								<tr v-for="category in categories" :key="category.id" class="transition hover:bg-slate-700/60">
									<td class="px-4 py-3 font-medium text-white">{{ category.nameUz }}</td>
									<td class="px-4 py-3 text-slate-300">{{ category.orderId }}</td>
									<td class="px-4 py-3">
										<span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="category.status !== false ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'">
											{{ category.status !== false ? 'Active' : 'Inactive' }}
										</span>
									</td>
									<td class="px-4 py-3 text-right">
										<button class="rounded-md px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white" @click="openCategory(category)">Edit</button>
										<button class="rounded-md px-3 py-1.5 text-red-400 hover:bg-red-500/15" @click="deleteCategory(category.id)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<!-- Orders -->
				<section v-else-if="activeSection === 'orders'" class="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[760px] text-sm">
							<thead class="border-b border-slate-700 bg-slate-700 text-left text-slate-300">
								<tr>
									<th class="px-4 py-3 font-semibold">Order</th>
									<th class="px-4 py-3 font-semibold">Customer</th>
									<th class="px-4 py-3 font-semibold">Total</th>
									<th class="px-4 py-3 font-semibold">Status</th>
									<th class="px-4 py-3 font-semibold">Change</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-700">
								<tr v-for="order in orders" :key="order.id" class="transition hover:bg-slate-700/60">
									<td class="px-4 py-3 font-medium text-white">#{{ order.id }}</td>
									<td class="px-4 py-3 text-slate-400">{{ order.user?.email || order.phoneNumber || '-' }}</td>
									<td class="px-4 py-3 text-slate-200">{{ order.totalPrice }} so'm</td>
									<td class="px-4 py-3">
										<span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="statusClass(order.orderStatus)">
											{{ order.orderStatus }}
										</span>
									</td>
									<td class="px-4 py-3">
										<select class="h-9 rounded-md border border-slate-600 bg-slate-700 px-3 text-sm text-slate-200" :value="order.orderStatus" @change="changeOrderStatus(order, $event.target.value)">
											<option v-for="status in orderStatuses" :key="status" :value="status">{{ status }}</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<!-- ── Settings ──────────────────────────────────────────────────── -->
				<section v-else class="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
					<!-- Tab bar -->
					<div class="flex gap-1 border-b border-slate-700 bg-slate-800/80 px-4 pt-3">
						<button
							v-for="tab in settingsTabs"
							:key="tab.key"
							class="flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition"
							:class="activeSettingsTab === tab.key ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'"
							@click="activeSettingsTab = tab.key"
						>
							<component :is="tab.icon" class="h-4 w-4" />
							{{ tab.label }}
						</button>
					</div>

					<!-- 👤 Users — settingsLoading dan MUSTAQIL -->
					<div v-if="activeSettingsTab === 'users'">
						<div v-if="usersLoading" class="p-8 text-center text-slate-400">
							<div class="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
							Yuklanmoqda...
						</div>
						<div v-else-if="usersError" class="p-8 text-center">
							<p class="mb-3 text-sm text-red-400">Xatolik: {{ usersError }}</p>
							<button class="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-600" @click="fetchUsers">Qayta urinish</button>
						</div>
						<div v-else-if="!users.length" class="p-8 text-center text-slate-500">
							Foydalanuvchilar topilmadi
						</div>
						<table v-else class="w-full table-fixed text-sm">
							<colgroup>
								<col style="width:220px" />
								<col />
								<col style="width:150px" />
								<col style="width:90px" />
								<col style="width:130px" />
							</colgroup>
							<thead class="border-b border-slate-700 bg-slate-700/80 text-left text-slate-300">
								<tr>
									<th class="px-4 py-3 font-semibold">Email</th>
									<th class="px-4 py-3 font-semibold">Ism</th>
									<th class="px-4 py-3 font-semibold">Role</th>
									<th class="px-4 py-3 font-semibold">Holat</th>
									<th class="px-4 py-3 text-right font-semibold">Amal</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-700">
								<tr v-for="user in users" :key="user.id" class="transition hover:bg-slate-700/40">
									<td class="truncate px-4 py-3 font-medium text-white">{{ user.email || '-' }}</td>
									<td class="truncate px-4 py-3 text-slate-300">
										{{ [user.firstName, user.lastName, user.name].filter(Boolean).join(' ') || user.email?.split('@')[0] || '-' }}
									</td>
									<td class="px-4 py-3">
										<span v-if="isSelf(user)" class="rounded-full bg-purple-500/15 px-2 py-1 text-xs font-semibold text-purple-400">
											{{ userRole(user).replace('ROLE_', '') }} (Siz)
										</span>
										<select
											v-else
											class="w-full rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
											:value="userRole(user)"
											@change="changeUserRole(user, $event.target.value)"
										>
											<option v-for="r in userRoles" :key="r" :value="r">{{ r.replace('ROLE_', '') }}</option>
										</select>
									</td>
									<td class="px-4 py-3">
										<span class="rounded-full px-2 py-1 text-xs font-medium"
											:class="user.enabled !== false ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'">
											{{ user.enabled !== false ? 'Aktiv' : 'Bloklangan' }}
										</span>
									</td>
									<td class="px-4 py-3 text-right">
										<span v-if="isSelf(user)" class="text-xs text-slate-600">—</span>
										<button
											v-else
											class="rounded-md px-3 py-1.5 text-xs font-medium"
											:class="user.enabled !== false
												? 'text-red-400 hover:bg-red-500/15'
												: 'text-emerald-400 hover:bg-emerald-500/15'"
											@click="toggleUserEnabled(user)"
										>
											{{ user.enabled !== false ? 'Bloklash' : 'Faollashtirish' }}
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<!-- Branches / Carousel / Coupons loading -->
					<div v-else-if="settingsLoading" class="flex items-center justify-center py-12 text-slate-400">
						<svg class="mr-3 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
						Yuklanmoqda...
					</div>

					<!-- 🏪 Branches -->
					<div v-else-if="activeSettingsTab === 'branches'" class="p-4">
						<div class="mb-4 flex justify-end">
							<button
								class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
								@click="openBranch()"
							>
								<Plus class="h-4 w-4" />
								Filial qo'shish
							</button>
						</div>
						<div class="overflow-x-auto">
							<table class="w-full min-w-[600px] text-sm">
								<thead class="border-b border-slate-700 bg-slate-700 text-left text-slate-300">
									<tr>
										<th class="px-4 py-3 font-semibold">Nomi</th>
										<th class="px-4 py-3 font-semibold">Tavsif</th>
										<th class="px-4 py-3 font-semibold">Telefon</th>
										<th class="px-4 py-3 font-semibold">Ish vaqti</th>
										<th class="px-4 py-3 text-right font-semibold">Amallar</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-700">
									<tr v-if="!branches.length">
										<td colspan="5" class="px-4 py-8 text-center text-slate-400">Filiallar mavjud emas</td>
									</tr>
									<tr v-for="branch in branches" :key="branch.id" class="transition hover:bg-slate-700/60">
										<td class="px-4 py-3 font-medium text-white">{{ branch.title || branch.name || '-' }}</td>
										<td class="px-4 py-3 text-slate-400">{{ branch.description || branch.address || '-' }}</td>
										<td class="px-4 py-3 text-slate-300">{{ branch.phoneNumber || branch.phone || '-' }}</td>
										<td class="px-4 py-3 text-slate-300">{{ branch.workHours || branch.workingHours || '-' }}</td>
										<td class="px-4 py-3 text-right">
											<button class="rounded-md px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white" @click="openBranch(branch)">Tahrirlash</button>
											<button class="rounded-md px-3 py-1.5 text-red-400 hover:bg-red-500/15" @click="deleteBranch(branch.id)">O'chirish</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- 🎠 Carousel -->
					<div v-else-if="activeSettingsTab === 'carousel'" class="p-4">
						<div class="mb-4 flex justify-end">
							<button class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500" @click="openCarousel()">
								<Plus class="h-4 w-4" />
								Slide qo'shish
							</button>
						</div>
						<div class="overflow-x-auto">
							<table class="w-full table-fixed text-sm">
								<colgroup>
									<col style="width:180px" />
									<col />
									<col style="width:80px" />
									<col style="width:90px" />
									<col style="width:160px" />
								</colgroup>
								<thead class="border-b border-slate-700 bg-slate-700/80 text-left text-slate-300">
									<tr>
										<th class="px-4 py-3 font-semibold">Sarlavha</th>
										<th class="px-4 py-3 font-semibold">Tavsif</th>
										<th class="px-4 py-3 font-semibold">Tartib</th>
										<th class="px-4 py-3 font-semibold">Holat</th>
										<th class="px-4 py-3 text-right font-semibold">Amallar</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-700">
									<tr v-if="!carouselItems.length">
										<td colspan="5" class="px-4 py-8 text-center text-slate-500">
											Carousel ma'lumotlari yo'q
										</td>
									</tr>
									<tr v-for="slide in carouselItems" :key="slide.id" class="transition hover:bg-slate-700/40">
										<td class="truncate px-4 py-3 font-medium text-white">{{ slide.title }}</td>
										<td class="truncate px-4 py-3 text-slate-400">{{ slide.description || '—' }}</td>
										<td class="px-4 py-3 text-center text-slate-300">{{ slide.orderIndex ?? '—' }}</td>
										<td class="px-4 py-3">
											<span class="rounded-full px-2 py-1 text-xs font-medium"
												:class="slide.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-600/60 text-slate-400'">
												{{ slide.isActive ? 'Aktiv' : 'Nofaol' }}
											</span>
										</td>
										<td class="px-4 py-3 text-right">
											<button class="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-slate-600 hover:text-white" @click="openCarousel(slide)">Tahrirlash</button>
											<button class="ml-1 rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-500/15" @click="deleteCarousel(slide.id)">O'chirish</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- 🎟️ Coupons -->
					<div v-else-if="activeSettingsTab === 'coupons'" class="p-4">
						<div class="mb-4 flex justify-end">
							<button class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500" @click="openCoupon()">
								<Plus class="h-4 w-4" />
								Kupon qo'shish
							</button>
						</div>
						<div class="overflow-x-auto">
							<table class="w-full table-fixed text-sm">
								<colgroup>
									<col style="width:130px" />
									<col style="width:110px" />
									<col style="width:120px" />
									<col />
									<col style="width:90px" />
									<col style="width:160px" />
								</colgroup>
								<thead class="border-b border-slate-700 bg-slate-700/80 text-left text-slate-300">
									<tr>
										<th class="px-4 py-3 font-semibold">Kod</th>
										<th class="px-4 py-3 font-semibold">Chegirma %</th>
										<th class="px-4 py-3 font-semibold">Min summa</th>
										<th class="px-4 py-3 font-semibold">Muddat</th>
										<th class="px-4 py-3 font-semibold">Holat</th>
										<th class="px-4 py-3 text-right font-semibold">Amallar</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-700">
									<tr v-if="!coupons.length">
										<td colspan="6" class="px-4 py-8 text-center text-slate-500">
											Kuponlar mavjud emas
										</td>
									</tr>
									<tr v-for="coupon in coupons" :key="coupon.id" class="transition hover:bg-slate-700/40">
										<td class="px-4 py-3 font-mono font-medium text-emerald-400">{{ coupon.code }}</td>
										<td class="px-4 py-3 text-slate-200">{{ coupon.discountPercent ?? coupon.discount ?? 0 }}%</td>
										<td class="px-4 py-3 text-slate-300">
											{{ (coupon.minOrderAmount ?? coupon.minOrderPrice ?? 0).toLocaleString() }} so'm
										</td>
										<td class="px-4 py-3 text-slate-400">
											{{ coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('uz-UZ') : '—' }}
										</td>
										<td class="px-4 py-3">
											<span class="rounded-full border px-2 py-1 text-xs"
												:class="(coupon.isActive ?? coupon.active) !== false ? 'border-emerald-600 bg-emerald-500/15 text-emerald-400' : 'border-slate-600 bg-slate-700 text-slate-400'">
												{{ (coupon.isActive ?? coupon.active) !== false ? 'Faol' : 'Nofaol' }}
											</span>
										</td>
										<td class="px-4 py-3 text-right">
											<button class="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-slate-600 hover:text-white" @click="openCoupon(coupon)">Tahrirlash</button>
											<button class="ml-1 rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-500/15" @click="deleteCoupon(coupon.id)">O'chirish</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</main>
		</div>

		<!-- ── Products / Categories modal ──────────────────────────────────── -->
		<div v-if="modal.open" class="fixed inset-0 z-50 flex items-end justify-end bg-black/60">
			<div class="h-full w-full max-w-xl overflow-y-auto border-l border-slate-700 bg-slate-800 p-6 shadow-2xl">
				<div class="mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
					<h3 class="text-lg font-bold text-white">{{ modal.mode === 'edit' ? 'Tahrirlash' : 'Yaratish' }}: {{ modal.type }}</h3>
					<button class="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-700 hover:text-white" @click="closeModal">Yopish</button>
				</div>

				<form v-if="modal.type === 'product'" class="space-y-4" @submit.prevent="saveProduct">
					<label class="block text-sm font-medium text-slate-300">
						Name uz
						<input v-model="productForm.nameUz" required class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="block text-sm font-medium text-slate-300">
							Price
							<input v-model.number="productForm.price" required type="number" min="0" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Current price
							<input v-model.number="productForm.currentPrice" type="number" min="0" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Weight
							<input v-model.number="productForm.weight" required type="number" min="0" step="0.01" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Stock
							<input v-model.number="productForm.stockQuantity" type="number" min="0" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
					</div>
					<label class="block text-sm font-medium text-slate-300">
						Category
						<select v-model="productForm.categoryId" required class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none">
							<option :value="null" disabled>Select category</option>
							<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nameUz }}</option>
						</select>
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Description
						<textarea v-model="productForm.descriptionUz" rows="4" class="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<div class="text-sm font-medium text-slate-300">
						Rasm
						<label class="mt-1 flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-slate-600 bg-slate-700 text-slate-400 transition hover:border-emerald-500">
							<svg v-if="uploadingProductImage" class="h-7 w-7 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
							</svg>
							<img v-else-if="productForm.attachmentId" :src="api.fileUrl(productForm.attachmentId)" class="h-full w-full object-cover" alt="preview" />
							<template v-else>
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
									<circle cx="12" cy="13" r="3" />
								</svg>
								<span class="text-xs">Rasm yuklash uchun bosing</span>
							</template>
							<input type="file" accept="image/*" class="hidden" @change="onProductImageChange" />
						</label>
						<p v-if="productImageError" class="mt-1 text-xs text-red-400">{{ productImageError }}</p>
					</div>
					<label class="flex items-center gap-2 text-sm font-medium text-slate-300">
						<input v-model="productForm.isAvailable" type="checkbox" class="h-4 w-4 accent-emerald-500" />
						Available
					</label>
					<button class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">Save product</button>
				</form>

				<form v-else class="space-y-4" @submit.prevent="saveCategory">
					<label class="block text-sm font-medium text-slate-300">
						Name uz
						<input v-model="categoryForm.nameUz" required class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Description
						<textarea v-model="categoryForm.descriptionUz" rows="4" class="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Order
						<input v-model.number="categoryForm.orderId" type="number" min="1" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<div class="text-sm font-medium text-slate-300">
						Rasm
						<label class="mt-1 flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-slate-600 bg-slate-700 text-slate-400 transition hover:border-emerald-500">
							<svg v-if="uploadingCategoryImage" class="h-7 w-7 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
							</svg>
							<img v-else-if="categoryForm.attachmentId" :src="api.fileUrl(categoryForm.attachmentId)" class="h-full w-full object-cover" alt="preview" />
							<template v-else>
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
									<circle cx="12" cy="13" r="3" />
								</svg>
								<span class="text-xs">Rasm yuklash uchun bosing</span>
							</template>
							<input type="file" accept="image/*" class="hidden" @change="onCategoryImageChange" />
						</label>
						<p v-if="categoryImageError" class="mt-1 text-xs text-red-400">{{ categoryImageError }}</p>
					</div>
					<label class="flex items-center gap-2 text-sm font-medium text-slate-300">
						<input v-model="categoryForm.active" type="checkbox" class="h-4 w-4 accent-emerald-500" />
						Active
					</label>
					<button class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">Save category</button>
				</form>
			</div>
		</div>

		<!-- ── Settings modal (Branch / Carousel / Coupon) ───────────────────── -->
		<div v-if="settingsModal.open" class="fixed inset-0 z-50 flex items-end justify-end bg-black/60">
			<div class="h-full w-full max-w-xl overflow-y-auto border-l border-slate-700 bg-slate-800 p-6 shadow-2xl">
				<div class="mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
					<h3 class="text-lg font-bold capitalize text-white">
						{{ settingsModal.mode === 'edit' ? 'Tahrirlash' : 'Qo\'shish' }}: {{ settingsModal.type }}
					</h3>
					<button class="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-700 hover:text-white" @click="closeSettingsModal">Yopish</button>
				</div>

				<!-- Branch form -->
				<form v-if="settingsModal.type === 'branch'" class="space-y-4" @submit.prevent="saveBranch">
					<label class="block text-sm font-medium text-slate-300">
						Nomi (title) *
						<input v-model="branchForm.title" required placeholder="Toshkent filiali" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Tavsif / Manzil
						<input v-model="branchForm.description" placeholder="Chilonzor ko'chasi, 12" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Telefon raqami
						<input v-model="branchForm.phoneNumber" placeholder="+998901234567" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Ish vaqti (workHours)
						<input v-model="branchForm.workHours" placeholder="09:00 – 22:00" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="block text-sm font-medium text-slate-300">
							Latitude
							<input v-model.number="branchForm.latitude" type="number" step="any" placeholder="41.2995" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Longitude
							<input v-model.number="branchForm.longitude" type="number" step="any" placeholder="69.2401" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
						</label>
					</div>
					<button class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">Saqlash</button>
				</form>

				<!-- Carousel form -->
				<form v-else-if="settingsModal.type === 'carousel'" class="space-y-4" @submit.prevent="saveCarousel">
					<label class="block text-sm font-medium text-slate-300">
						Sarlavha
						<input v-model="carouselForm.title" required class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Tavsif
						<textarea v-model="carouselForm.description" rows="3" class="mt-1 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Rasm URL
						<input v-model="carouselForm.imageUrl" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="block text-sm font-medium text-slate-300">
						Tartib raqami
						<input v-model.number="carouselForm.orderIndex" type="number" min="0" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
					</label>
					<label class="flex items-center gap-2 text-sm font-medium text-slate-300">
						<input v-model="carouselForm.isActive" type="checkbox" class="h-4 w-4 accent-emerald-500" />
						Faol
					</label>
					<button class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">Saqlash</button>
				</form>

				<!-- Coupon form -->
				<form v-else-if="settingsModal.type === 'coupon'" class="space-y-4" @submit.prevent="saveCoupon">
					<label class="block text-sm font-medium text-slate-300">
						Kupon kodi
						<input v-model="couponForm.code" required placeholder="SAVE20" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 font-mono uppercase text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
					</label>
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="block text-sm font-medium text-slate-300">
							Chegirma (%)
							<input v-model.number="couponForm.discountPercent" type="number" min="0" max="100" required class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Min buyurtma (so'm)
							<input v-model.number="couponForm.minOrderAmount" type="number" min="0" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Max foydalanish soni
							<input v-model.number="couponForm.maxUses" type="number" min="1" placeholder="Cheksiz" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none" />
						</label>
						<label class="block text-sm font-medium text-slate-300">
							Tugash sanasi
							<input v-model="couponForm.expiresAt" type="datetime-local" class="mt-1 h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 text-white focus:border-emerald-500 focus:outline-none" />
						</label>
					</div>
					<label class="flex items-center gap-2 text-sm font-medium text-slate-300">
						<input v-model="couponForm.isActive" type="checkbox" class="h-4 w-4 accent-emerald-500" />
						Faol
					</label>
					<button class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">Saqlash</button>
				</form>
			</div>
		</div>
	</div>
</template>
