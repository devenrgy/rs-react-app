import type { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getPhotoById } from '@/shared/api'
import { PhotoDetailsModal } from '@/widgets/photo-details-modal'

type Props = {
	params: Promise<{ id: string, locale: Locale }>
	searchParams?: Promise<{ query?: string, page?: string }>
}

export default async function Page(props: Props) {
	const { id, locale } = await props.params

	const { data, error } = await getPhotoById({ id })

	setRequestLocale(locale)

	if (error) {
		console.error('Error fetching photo details:', error)
		return
	}

	return <PhotoDetailsModal data={data} />
}
