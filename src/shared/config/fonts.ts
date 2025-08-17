import { Marck_Script as FontBrand, Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
	subsets: ['cyrillic'],
	variable: '--font-sans',
})

export const fontBrand = FontBrand({
	subsets: ['latin', 'cyrillic'],
	weight: ['400'],
	variable: '--font-brand',
})
