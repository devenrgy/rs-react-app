import { getTranslations } from 'next-intl/server'
import { NavigationLink } from '@/shared/ui/navigation-link'
import { navigation } from '../config/navigation'

export const Navigation = async () => {
	const t = await getTranslations('Navigation')

	return (
		<nav>
			<ul className='flex gap-3 text-sm font-medium'>
				{navigation.map(({ label, href }) => (
					<li key={href}>
						<NavigationLink href={href}>{t(label)}</NavigationLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
