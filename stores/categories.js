export const useCategoriesStore = defineStore('categoriesStore', () => {
	const config = useRuntimeConfig()
	const categories = ref([])
	const loading = ref(false)

	const fetchCategories = async () => {
		loading.value = true
		try {
			// Kategoriyalarni ol
			const catRes = await $fetch(`${config.public.apiBase}/categories/open`)
			const cats = catRes.data || catRes

			// Har kategoriya uchun mahsulotlarni ol
			const result = await Promise.all(
				cats.map(async (cat) => {
					const prodRes = await $fetch(
						`${config.public.apiBase}/open/products?categoryId=${cat.id}`
					)
					const products = prodRes.data || prodRes

					return {
						id: cat.id,
						title: { uz: cat.nameUz, ru: cat.nameRu, en: cat.nameEng },
						products: products.map(p => ({
							id: p.id,
							title: { uz: p.name },
							description: { uz: p.descriptionUz || '' },
							out_price: p.currentPrice > 0 ? p.currentPrice : p.price,
							currency: "so'm",
							discountPrice: p.discountPrice,
							image: p.attachment?.id
								? `${config.public.apiBase}/files/view/${p.attachment.id}`
								: null
						}))
					}
				})
			)
			categories.value = result
		} catch (e) {
			console.error('Xatolik:', e)
		} finally {
			loading.value = false
		}
	}

	return { categories, loading, fetchCategories }
})