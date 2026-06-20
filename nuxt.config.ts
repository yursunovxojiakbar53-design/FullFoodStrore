export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },

	// Sahifalar (pages/) avtomatik skanerlanadi
	pages: true,

	// Dev tezligi: og'ir kutubxonalarni oldindan tayyorlash (qayta kompilyatsiyani kamaytiradi)
	vite: {
		optimizeDeps: {
			include: [
				'vue',
				'pinia',
				'@vueuse/core',
				'@vuelidate/core',
				'@vuelidate/validators',
				'maska',
				'lucide-vue-next',
				'@iconify/vue',
				'clsx',
				'tailwind-merge',
				'class-variance-authority',
				'swiper',
				'swiper/vue',
				'reka-ui',
				'vaul-vue'
			]
		}
	},

	runtimeConfig: {
		public: {
			backendBase: process.env.NUXT_PUBLIC_BACKEND_BASE || 'http://localhost:8080',
			apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api/v1'
		}
	},

	app: {
		pageTransition: { name: 'page-change', mode: 'out-in' },
		head: {
			title: 'Food Store - Tez va Mazali Yetkazib Berish',
			meta: [
				{ name: 'description', content: 'Food Store - eng mazali taomlarni tez yetkazib beramiz!' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
		}
	},

	css: ['@/assets/css/tailwind.css'],

	modules: [
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'shadcn-nuxt',
		'pinia-plugin-persistedstate/nuxt'
	],

	shadcn: { prefix: '', componentDir: './components/ui' },

	colorMode: { classSuffix: '', preference: 'light', fallback: 'light' },

	i18n: {
		types: 'composition',
		strategy: 'no_prefix',
		defaultLocale: 'uz',
		lazy: true,
		langDir: 'locales',
		locales: [
			{ code: 'uz', iso: 'uz-UZ', name: "O'zbekcha", file: 'uz.json' },
			{ code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
			{ code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' }
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected'
		}
	},

	build: {}
})
