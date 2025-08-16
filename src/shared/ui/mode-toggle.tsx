'use client'

import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { cn } from '@/shared/lib/cn'

export const ModeToggle = ({ className }: { className?: string }) => {
	const { setTheme } = useTheme()
	const t = useTranslations('ModeToggle')

	return (
		<button
			className={cn(
				'flex cursor-pointer rounded-md hover:bg-secondary p-3',
				className,
			)}
			title={t('label')}
			onClick={() => setTheme(theme => (theme === 'light' ? 'dark' : 'light'))}
			type='button'
		>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:scale-0' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
			<span className='sr-only'>{t('label')}</span>
		</button>
	)
}
