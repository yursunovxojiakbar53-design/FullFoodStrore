export const useLanguageSwitcher = () => {
	const { locale, setLocale } = useI18n();

	const languagesList = [
		{
			name: "O'zbekcha",
			code: 'uz',
			flag: '/images/svg/flags/uz.svg'
		},
		{
			name: 'English',
			code: 'en',
			flag: '/images/svg/flags/en.svg'
		},
		{
			name: 'Русский',
			code: 'ru',
			flag: '/images/svg/flags/ru.svg'
		}
	];

	const currentLanguage = computed(() => languagesList.find((lang) => lang.code === locale.value));

	function changeLocale(_locale) {
		setLocale(_locale);
		locale.value = _locale;
	}

	return { currentLanguage, languagesList, changeLocale };
};
