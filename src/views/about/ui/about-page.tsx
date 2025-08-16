import type { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params
	const t = await getTranslations('About')

	setRequestLocale(locale)

	return (
		<section className='relative min-h-dvh overflow-clip'>
			<h1 className='absolute text-nowrap pointer-events-none -bottom-50 tracking-wide text-[500px]/none uppercase font-bold opacity-5'>{t('title')}</h1>
			<div className='container gap-5 flex flex-col py-50 text-lg leading-relaxed min-h-dvh'>
				{t.rich('description', {
					p: chunks => <p>{chunks}</p>,
					telegram: chunks => <span className='text-sky-400 dark:text-sky-300'>{chunks}</span>,
					discord: chunks => <span className='text-indigo-400 dark:text-indigo-300'>{chunks}</span>,
				})}
			</div>
		</section>
	)
}
