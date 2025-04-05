import { VLazyLoad } from '@/directives/lazy-load.ts'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('lazy', VLazyLoad)
})
