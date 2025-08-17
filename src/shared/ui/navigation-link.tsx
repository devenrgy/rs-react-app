'use client'

import type { ComponentProps } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Link } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'

export const NavigationLink = ({
	href,
	...rest
}: ComponentProps<typeof Link>) => {
	const selectedLayoutSegment = useSelectedLayoutSegment()
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
	const isActive = pathname === href

	return (
		<Link
			aria-current={isActive ? 'page' : undefined}
			className={cn('duration-200 py-3 px-4', { 'text-brand': pathname === href, 'text-muted hover:text-muted-hover': pathname !== href })}
			href={href}
			{...rest}
		/>
	)
}
