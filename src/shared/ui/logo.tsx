import { getTranslations } from 'next-intl/server'
import { Link } from '../i18n/navigation'
import { routes } from '../routes'

export const Logo = async () => {
	const t = await getTranslations('Navigation')

	return <Link className='font-brand text-3xl py-3 px-4' href={routes.home.path}>{t('logo')}</Link>
}
