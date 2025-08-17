'use client'

import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/shared/lib/cn'
import { useTheme } from '@/shared/ui/theme-provider'

export const ModeToggle = ({ className }: { className?: string }) => {
	const { handleUpdateTheme } = useTheme()
	const t = useTranslations('ModeToggle')

	return (
		<button
			className={cn(
				'flex cursor-pointer rounded-md hover:bg-secondary p-3',
				className,
			)}
			title={t('label')}
			onClick={handleUpdateTheme}
			type='button'
		>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:scale-0' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
			<span className='sr-only'>{t('label')}</span>
		</button>
	)
}
