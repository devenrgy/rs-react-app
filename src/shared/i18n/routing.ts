import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['en', 'ru'],
	defaultLocale: 'en',
	localePrefix: 'as-needed',
	pathnames: {
		'/': '/',
		'/about': {
			en: '/about',
			ru: '/обо-мне',
		},
		'/photo-details/[id]': '/photo-details/[id]',
	},
})
