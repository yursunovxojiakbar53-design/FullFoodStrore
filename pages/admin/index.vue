<script setup>
import { Boxes, CheckCircle2, FolderTree, LayoutDashboard, PackagePlus, Settings, ShoppingBag, XCircle } from 'lucide-vue-next'

definePageMeta({
	middleware: 'admin'
})

const api = useApi()

const sections = [
	{ key: 'products', label: 'Products', icon: Boxes },
	{ key: 'categories', label: 'Categories', icon: FolderTree },
	{ key: 'orders', label: 'Orders', icon: ShoppingBag },
	{ key: 'settings', label: 'Settings', icon: Settings }
]

const orderStatuses = ['NEW', 'PROCESSING', 'DELIVERED', 'CANCELLED']

const activeSection = ref('products')
const loading = ref(false)
const error = ref('')
const products = ref([])
const categories = ref([])
const orders = ref([])
const modal = reactive({ open: false, type: '', mode: 'create' })
const productForm = reactive(emptyProduct())
const categoryForm = reactive(emptyCategory())

onMounted(async () => {
	await refreshAll()
})

const pageTitle = computed(() => sections.find((item) => item.key === activeSection.value)?.label || 'Admin')

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
	orders.value = api.extractList(res)
}

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

async function changeOrderStatus(order, status) {
	await api.put(`/admin/orders/${order.id}/status`, null, { query: { status } })
	order.orderStatus = status
}

function statusClass(status) {
	const tone = {
		NEW: 'bg-blue-50 text-blue-700 border-blue-200',
		PROCESSING: 'bg-amber-50 text-amber-700 border-amber-200',
		DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
		CANCELLED: 'bg-red-50 text-red-700 border-red-200',
		CANCELED: 'bg-red-50 text-red-700 border-red-200'
	}
	return tone[status] || 'bg-slate-50 text-slate-700 border-slate-200'
}
</script>

<template>
	<div class="min-h-screen bg-slate-50 text-slate-950">
		<div class="grid min-h-screen lg:grid-cols-[260px_1fr]">
			<aside class="border-r bg-white px-4 py-5">
				<div class="mb-6 flex items-center gap-3 px-2">
					<div class="grid h-10 w-10 place-items-center rounded-lg bg-emerald-600 text-white">
						<LayoutDashboard class="h-5 w-5" />
					</div>
					<div>
						<p class="text-sm text-slate-500">FoodStore</p>
						<h1 class="text-lg font-semibold">Admin</h1>
					</div>
				</div>

				<nav class="space-y-1">
					<button
						v-for="item in sections"
						:key="item.key"
						class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition"
						:class="activeSection === item.key ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'"
						@click="activeSection = item.key"
					>
						<component :is="item.icon" class="h-4 w-4" />
						{{ item.label }}
					</button>
				</nav>
			</aside>

			<main class="min-w-0 p-4 sm:p-6">
				<header class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p class="text-sm text-slate-500">Dashboard</p>
						<h2 class="text-2xl font-semibold">{{ pageTitle }}</h2>
					</div>
					<button
						v-if="activeSection === 'products'"
						class="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
						@click="openProduct()"
					>
						<PackagePlus class="h-4 w-4" />
						Add product
					</button>
					<button
						v-else-if="activeSection === 'categories'"
						class="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
						@click="openCategory()"
					>
						<FolderTree class="h-4 w-4" />
						Add category
					</button>
				</header>

				<div v-if="error" class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{{ error }}
				</div>

				<div v-if="loading" class="rounded-md border bg-white p-6 text-sm text-slate-500">Loading...</div>

				<section v-else-if="activeSection === 'products'" class="overflow-hidden rounded-md border bg-white">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[760px] text-sm">
							<thead class="bg-slate-100 text-left text-slate-600">
								<tr>
									<th class="px-4 py-3 font-medium">Name</th>
									<th class="px-4 py-3 font-medium">Category</th>
									<th class="px-4 py-3 font-medium">Price</th>
									<th class="px-4 py-3 font-medium">Stock</th>
									<th class="px-4 py-3 font-medium">Status</th>
									<th class="px-4 py-3 text-right font-medium">Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y">
								<tr v-for="product in products" :key="product.id">
									<td class="px-4 py-3 font-medium">{{ product.nameUz || product.name }}</td>
									<td class="px-4 py-3 text-slate-600">{{ product.category?.nameUz || '-' }}</td>
									<td class="px-4 py-3">{{ product.currentPrice || product.price }} so'm</td>
									<td class="px-4 py-3">{{ product.stockQuantity ?? 0 }}</td>
									<td class="px-4 py-3">
										<span class="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs" :class="product.available !== false ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'">
											<CheckCircle2 v-if="product.available !== false" class="h-3 w-3" />
											<XCircle v-else class="h-3 w-3" />
											{{ product.available !== false ? 'Active' : 'Inactive' }}
										</span>
									</td>
									<td class="px-4 py-3 text-right">
										<button class="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100" @click="openProduct(product)">Edit</button>
										<button class="rounded-md px-3 py-1.5 text-red-600 hover:bg-red-50" @click="deleteProduct(product.id)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section v-else-if="activeSection === 'categories'" class="overflow-hidden rounded-md border bg-white">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[640px] text-sm">
							<thead class="bg-slate-100 text-left text-slate-600">
								<tr>
									<th class="px-4 py-3 font-medium">Name</th>
									<th class="px-4 py-3 font-medium">Order</th>
									<th class="px-4 py-3 font-medium">Status</th>
									<th class="px-4 py-3 text-right font-medium">Actions</th>
								</tr>
							</thead>
							<tbody class="divide-y">
								<tr v-for="category in categories" :key="category.id">
									<td class="px-4 py-3 font-medium">{{ category.nameUz }}</td>
									<td class="px-4 py-3">{{ category.orderId }}</td>
									<td class="px-4 py-3">
										<span class="rounded-full border px-2 py-1 text-xs" :class="category.status !== false ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'">
											{{ category.status !== false ? 'Active' : 'Inactive' }}
										</span>
									</td>
									<td class="px-4 py-3 text-right">
										<button class="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100" @click="openCategory(category)">Edit</button>
										<button class="rounded-md px-3 py-1.5 text-red-600 hover:bg-red-50" @click="deleteCategory(category.id)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section v-else-if="activeSection === 'orders'" class="overflow-hidden rounded-md border bg-white">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[760px] text-sm">
							<thead class="bg-slate-100 text-left text-slate-600">
								<tr>
									<th class="px-4 py-3 font-medium">Order</th>
									<th class="px-4 py-3 font-medium">Customer</th>
									<th class="px-4 py-3 font-medium">Total</th>
									<th class="px-4 py-3 font-medium">Status</th>
									<th class="px-4 py-3 font-medium">Change</th>
								</tr>
							</thead>
							<tbody class="divide-y">
								<tr v-for="order in orders" :key="order.id">
									<td class="px-4 py-3 font-medium">#{{ order.id }}</td>
									<td class="px-4 py-3 text-slate-600">{{ order.user?.email || order.phoneNumber || '-' }}</td>
									<td class="px-4 py-3">{{ order.totalPrice }} so'm</td>
									<td class="px-4 py-3">
										<span class="rounded-full border px-2 py-1 text-xs" :class="statusClass(order.orderStatus)">
											{{ order.orderStatus }}
										</span>
									</td>
									<td class="px-4 py-3">
										<select class="h-9 rounded-md border bg-white px-3 text-sm" :value="order.orderStatus" @change="changeOrderStatus(order, $event.target.value)">
											<option v-for="status in orderStatuses" :key="status" :value="status">{{ status }}</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section v-else class="rounded-md border bg-white p-6">
					<h3 class="mb-2 text-lg font-semibold">Settings</h3>
					<p class="text-sm text-slate-500">Admin access is protected by JWT roles: ADMIN and SUPER_ADMIN.</p>
				</section>
			</main>
		</div>

		<div v-if="modal.open" class="fixed inset-0 z-50 flex items-end justify-end bg-slate-950/40">
			<div class="h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-xl">
				<div class="mb-5 flex items-center justify-between">
					<h3 class="text-lg font-semibold">{{ modal.mode === 'edit' ? 'Edit' : 'Create' }} {{ modal.type }}</h3>
					<button class="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100" @click="closeModal">Close</button>
				</div>

				<form v-if="modal.type === 'product'" class="space-y-4" @submit.prevent="saveProduct">
					<label class="block text-sm font-medium">
						Name uz
						<input v-model="productForm.nameUz" required class="mt-1 h-10 w-full rounded-md border px-3" />
					</label>
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="block text-sm font-medium">
							Price
							<input v-model.number="productForm.price" required type="number" min="0" class="mt-1 h-10 w-full rounded-md border px-3" />
						</label>
						<label class="block text-sm font-medium">
							Current price
							<input v-model.number="productForm.currentPrice" type="number" min="0" class="mt-1 h-10 w-full rounded-md border px-3" />
						</label>
						<label class="block text-sm font-medium">
							Weight
							<input v-model.number="productForm.weight" required type="number" min="0" step="0.01" class="mt-1 h-10 w-full rounded-md border px-3" />
						</label>
						<label class="block text-sm font-medium">
							Stock
							<input v-model.number="productForm.stockQuantity" type="number" min="0" class="mt-1 h-10 w-full rounded-md border px-3" />
						</label>
					</div>
					<label class="block text-sm font-medium">
						Category
						<select v-model="productForm.categoryId" required class="mt-1 h-10 w-full rounded-md border bg-white px-3">
							<option :value="null" disabled>Select category</option>
							<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nameUz }}</option>
						</select>
					</label>
					<label class="block text-sm font-medium">
						Description
						<textarea v-model="productForm.descriptionUz" rows="4" class="mt-1 w-full rounded-md border px-3 py-2" />
					</label>
					<label class="flex items-center gap-2 text-sm font-medium">
						<input v-model="productForm.isAvailable" type="checkbox" class="h-4 w-4" />
						Available
					</label>
					<button class="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Save product</button>
				</form>

				<form v-else class="space-y-4" @submit.prevent="saveCategory">
					<label class="block text-sm font-medium">
						Name uz
						<input v-model="categoryForm.nameUz" required class="mt-1 h-10 w-full rounded-md border px-3" />
					</label>
					<label class="block text-sm font-medium">
						Description
						<textarea v-model="categoryForm.descriptionUz" rows="4" class="mt-1 w-full rounded-md border px-3 py-2" />
					</label>
					<label class="block text-sm font-medium">
						Order
						<input v-model.number="categoryForm.orderId" type="number" min="1" class="mt-1 h-10 w-full rounded-md border px-3" />
					</label>
					<label class="flex items-center gap-2 text-sm font-medium">
						<input v-model="categoryForm.active" type="checkbox" class="h-4 w-4" />
						Active
					</label>
					<button class="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Save category</button>
				</form>
			</div>
		</div>
	</div>
</template>
