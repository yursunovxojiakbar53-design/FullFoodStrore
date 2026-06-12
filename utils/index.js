export const onlyNumbers = (event) => {
	if (!/^\d$/.test(event.key)) {
		event.preventDefault()
	}
}

export function formatPhoneNumber(phoneNumber) {
	if (!phoneNumber) return ''

	const cleanedNumber = phoneNumber.replace(/\D/g, '')

	if (cleanedNumber.length === 9) {
		return cleanedNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+998 ($1) $2 $3 $4')
	}

	if (cleanedNumber.length === 12) {
		return cleanedNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5')
	}

	return phoneNumber
}

export function formatPrice(price) {
	if (!price) return '0'
	return Number(price).toLocaleString('en-US')
}
