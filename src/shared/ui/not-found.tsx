'use client'

import { useTranslations } from 'next-intl'

const NotFound = () => {
	const t = useTranslations('NotFoundPage')

	return (
		<div>
			<h1>{t('title')}</h1>
		</div>
	)
}

export default NotFound
