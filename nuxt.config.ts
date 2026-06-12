export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

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
		strategy: 'prefix_and_default',
		defaultLocale: 'uz',
		lazy: true,
		langDir: 'locales',
		locales: [
			{ code: 'ru', iso: 'ru-RU', file: 'ru.json' },
			{ code: 'uz', iso: 'uz', file: 'uz.json' },
			{ code: 'en', iso: 'en', file: 'en.json' }
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
			alwaysRedirect: true
		}
	},

	build: {}
})
