import type { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { getPhotoById } from '@/shared/api'
import { Link } from '@/shared/i18n/navigation'
import { BaseLayout } from '@/shared/ui/base-layout'

export default async function PhotoDetailsPage(props: { params: Promise<{ id: string, locale: Locale }> }) {
	const { id, locale } = await props.params

	const t = await getTranslations('PhotoDetails')

	setRequestLocale(locale)

	const { data, error } = await getPhotoById({ id })

	if (error) {
		console.error('Error fetching photo details:', error)
		return null
	}

	return (
		<BaseLayout>
			<section className='grid grid-cols-2 gap-20 grid-rows-[600px] items-center container h-full'>
				<Image
					src={data.urls.regular}
					width={data.width}
					height={data.height}
					alt={data.alt_description}
					className='w-full h-full object-cover rounded-3xl'
				/>

				<div>
					<h2 className='mb-4 text-balance text-2xl font-bold first-letter:uppercase'>
						{data.alt_description}
					</h2>
					<p className='mb-4'>{data.description}</p>
					<div className='space-y-4'>
						<div>
							<h3 className='text-lg font-semibold'>{t('photographer')}</h3>
							<p>{data.user.name}</p>
							<p className='text-sm'>{data.user.bio}</p>
							<p className='text-sm'>
								{t('location')}
								:
								{' '}
								{data.user.location}
							</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold'>{t('details')}</h3>
							<p>
								{t('likes')}
								:
								{' '}
								{data.likes}
							</p>
							<p>
								{t('dimensions')}
								:
								{' '}
								{data.width}
								{' '}
								x
								{' '}
								{data.height}
							</p>
							<p>
								{t('created')}
								:
								{' '}
								{new Date(data.created_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
							</p>
							<p>
								{t('updated')}
								:
								{' '}
								{new Date(data.updated_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
							</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold'>{t('links')}</h3>

							<p>
								<Link
									href={data.links.html}
									className='underline-offset-4 hover:underline'
									rel='noreferrer'
									target='_blank'
								>
									View on Unsplash
								</Link>
							</p>

							{data.links.download && (
								<p>
									<Link
										href={data.links.download}
										className='underline-offset-4 hover:underline'
										rel='noreferrer'
										target='_blank'
									>
										Download
									</Link>
								</p>
							)}

						</div>
					</div>
				</div>
			</section>
		</BaseLayout>
	)
}
