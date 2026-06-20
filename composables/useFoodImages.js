// Mahsulotda yuklangan rasm bo'lmasa, internetdan mos oziq-ovqat rasmini qaytaradi.
export const useFoodImages = () => {
	const api = useApi()

	// Unsplash oziq-ovqat rasmlari (bepul, barqaror CDN)
	const foodImages = [
		'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80&auto=format&fit=crop'
	]

	const hasRealImage = (value) => {
		if (!value) return false
		const raw = String(value).toLowerCase()
		return raw !== '0' && raw !== 'null' && raw !== 'undefined'
	}

	// Mahsulotning haqiqiy rasmi bo'lsa — uni, bo'lmasa id bo'yicha doimiy food rasm
	const foodImage = (product) => {
		const raw = product?.image || product?.imageUrl || product?.attachmentId || product?.attachment?.id
		if (hasRealImage(raw)) return api.fileUrl(raw)

		const id = Number(product?.id)
		const index = Number.isFinite(id) && id > 0 ? id % foodImages.length : 0
		return foodImages[index]
	}

	return { foodImages, foodImage }
}
