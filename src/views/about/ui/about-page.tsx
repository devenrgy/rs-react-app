import type { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/shared/i18n/navigation'

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params
	const t = await getTranslations('About')

	setRequestLocale(locale)

	return (
		<section className='relative min-h-dvh overflow-clip'>
			<h1 className='absolute text-nowrap pointer-events-none -bottom-50 tracking-wide text-[500px]/none uppercase font-bold opacity-5'>{t('title')}</h1>
			<div className='container space-y-5 py-50 text-lg leading-relaxed min-h-dvh'>
				{t.rich('description', {
					p: chunks => <p>{chunks}</p>,
					span: chunks => <span className='text-amber-500 dark:text-amber-400'>{chunks}</span>,
					a: chunks => (
						<Link
							href='https://rs.school/courses/reactjs'
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 dark:text-blue-400'
						>
							{chunks}
						</Link>
					),
					github: chunks => (
						<Link
							href='https://github.com/devenrgy'
							target='_blank'
							rel='noopener noreferrer'
							className='text-indigo-500 dark:text-indigo-400'
						>
							{chunks}
						</Link>
					),
				})}
			</div>
		</section>
	)
}
