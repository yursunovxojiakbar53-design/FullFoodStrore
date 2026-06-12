export const useCategoriesStore = defineStore('categoriesStore', () => {
	const api = useApi()
	const categories = ref([])
	const loading = ref(false)
	const authError = ref(false)
	const error = ref(null)

	const fetchCategories = async () => {
		loading.value = true
		authError.value = false
		error.value = null

		try {
			const [catRes, prodRes] = await Promise.all([
				api.get('/categories/open'),
				api.get('/open/products', { query: { page: 0, size: 200 } })
			])

			const cats = api.extractList(catRes)
				.filter((cat) => cat.status !== false && cat.active !== false)
				.sort((a, b) => (a.orderId || 0) - (b.orderId || 0))

			const allProducts = api.extractList(prodRes)
				.filter((product) => product.available !== false && product.isAvailable !== false)

			if (!cats.length) {
				categories.value = allProducts.length
					? [{
						id: 0,
						title: { uz: 'Barcha mahsulotlar', ru: 'Все продукты', en: 'All products' },
						products: allProducts.map(mapProduct)
					}]
					: []
				return
			}

			categories.value = cats.map((cat) => ({
				id: cat.id,
				title: {
					uz: cat.nameUz || cat.name || '',
					ru: cat.nameRu || cat.name || '',
					en: cat.nameEng || cat.name || ''
				},
				products: allProducts
					.filter((product) =>
						product.categoryId == cat.id ||
						product.category_id == cat.id ||
						product.category?.id == cat.id ||
						product.categoryDTO?.id == cat.id
					)
					.map(mapProduct)
			}))

			const hasAnyProduct = categories.value.some((category) => category.products.length > 0)
			if (!hasAnyProduct && allProducts.length && categories.value.length) {
				categories.value[0].products = allProducts.map(mapProduct)
			}
		} catch (e) {
			error.value = api.errorMessage(e, 'Mahsulotlar yuklanmadi')
			authError.value = api.isAuthError(e)
			console.error('Kategoriyalar yuklanmadi:', error.value)
		} finally {
			loading.value = false
		}
	}

	const mapProduct = (product) => {
		const basePrice = Number(product.price || 0)
		const salePrice = Number(product.currentPrice || product.discountPrice || basePrice || 0)

		return {
			id: product.id,
			title: {
				uz: product.nameUz || product.name || '',
				ru: product.nameRu || product.name || '',
				en: product.nameEng || product.name || ''
			},
			description: {
				uz: product.descriptionUz || product.description || '',
				ru: product.descriptionRu || product.description || '',
				en: product.descriptionEng || product.descriptionEn || product.description || ''
			},
			out_price: salePrice,
			currency: "so'm",
			discountPrice: basePrice > salePrice ? basePrice : null,
			image: product.attachment?.id || product.attachmentId || product.imageUrl || null
		}
	}

	return { categories, loading, authError, error, fetchCategories }
})
