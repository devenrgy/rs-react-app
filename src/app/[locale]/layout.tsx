import type { Locale } from 'next-intl'
import type { ReactNode } from 'react'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { notFound } from 'next/navigation'
import { fontBrand, fontSans } from '@/shared/config/fonts'
import { routing } from '@/shared/i18n/routing'
import { cn } from '@/shared/lib/cn'
import { ThemeProvider } from '@/shared/ui/theme-provider'

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await props.params

	const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

	return {
		title: t('title'),
	}
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode
	params: Promise<{ locale: Locale }>
}>) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	setRequestLocale(locale)

	return (
		<html className='h-full' lang={locale} suppressHydrationWarning>
			<head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body className={cn('h-full', fontSans.variable, fontBrand.variable)}>
				<ThemeProvider>
					<NextIntlClientProvider>
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
