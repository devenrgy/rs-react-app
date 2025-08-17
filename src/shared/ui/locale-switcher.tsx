'use client'

import type { Locale } from 'next-intl'
import type { MouseEvent } from 'react'

import { Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { cn } from '@/shared/lib/cn'

export const LocaleSwitcher = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = useParams()

	const onSelectChange = (event: MouseEvent<HTMLButtonElement>) => {
		const nextLocale = event.currentTarget.textContent as Locale
		const currentParams = Object.fromEntries(searchParams.entries())

		startTransition(() => {
			router.replace(
				{ pathname, query: { ...currentParams } },
				{ locale: nextLocale },
			)
		})
	}

	const t = useTranslations('LocaleSwitcher')

	return (
		<>
			<button type='button' title={t('label')} popoverTarget='languages' className='anchor/languages hover:bg-secondary p-3 cursor-pointer rounded-md'>
				<Languages size={20} />
			</button>
			<ul id='languages' popover='auto' className='anchored-bottom/languages fixed top-2 starting:opacity-0 text-sm duration-300 bg-secondary rounded-md'>
				{routing.locales.map(cur => (
					<li className='flex' key={cur}>
						<button
							className={cn(
								'w-full text-muted hover:text-primary duration-200 cursor-pointer py-2 px-4',
								{ 'text-brand pointer-events-none': cur === params.locale },
								{ 'transition-opacity disabled:opacity-50': isPending },
							)}
							disabled={isPending}
							onClick={onSelectChange}
							type='button'
						>
							{t('locale', { locale: cur })}
						</button>
					</li>
				))}
			</ul>
		</>
	)
}
