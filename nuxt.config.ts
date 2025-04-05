// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	app: {
		pageTransition: { name: 'page-change', mode: 'out-in' },
		head: {
			title: 'Marvarid Restorani - Mazali va An’anaviy O‘zbek Taomlari',
			meta: [
				{ name: 'description', content: 'Marvarid Restorani - an’anaviy O‘zbek oshxonasi! Palov, shashlik, lag‘mon, somsa, manti, do‘lma va boshqa mazali milliy taomlar. Qulay muhit, milliy uslub va eng yaxshi xizmat!' },
				{
					name: 'keywords',
					content:
						'Marvarid Restorani, O‘zbek taomlari, milliy taomlar, palov, osh, shashlik, lag‘mon, somsa, manti, do‘lma, chuchvara, norin, qazi, tandir go‘sht, halol restoran, choyxona, qahva, milliy shirinliklar, ko‘za sho‘rva, mastava, qovurdoq, shorva, oilaviy restoran, restoran Buxoro, restoran O‘zbekiston, milliy oshxona, halol taomlar, restoran'
				},
				{ property: 'og:title', content: 'Marvarid Restorani - Mazali va An’anaviy O‘zbek Taomlari' },
				{ property: 'og:description', content: 'An’anaviy O‘zbek oshxonasi - palov, shashlik, somsa va boshqa milliy taomlar. Qulay muhit va eng yaxshi xizmat!' },
				{ property: 'og:image', content: 'https://marvarid.vercel.app/image.png' },
				{ property: 'og:type', content: 'restaurant' },
				{ name: 'twitter:title', content: 'Marvarid Restorani - Mazali va An’anaviy O‘zbek Taomlari' },
				{ name: 'twitter:description', content: 'Palov, shashlik, lag‘mon, somsa va boshqa milliy taomlar. O‘zbek oshxonasining haqiqiy lazzati!' },
				{ name: 'twitter:image', content: 'https://marvarid.vercel.app/image.png' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
				{ rel: 'canonical', href: 'https://marvarid.vercel.app/' }
			]
		}
	},
	css: ['@/assets/css/tailwind.css'],
	modules: ['@pinia/nuxt', 'dayjs-nuxt', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'shadcn-nuxt', 'nuxt-swiper', 'pinia-plugin-persistedstate/nuxt'],

	shadcn: {
		prefix: '',
		componentDir: './components/ui'
	},
	colorMode: {
		classSuffix: '',
		preference: 'light',
		fallback: 'light'
	},

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
	build: {
		transpile: ['vue-toastification']
	}
})
