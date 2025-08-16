import Image from 'next/image'
import { getPhotoById } from '@/shared/api'
import { BaseLayout } from '@/shared/ui/base-layout'
import { ExternalLink } from '@/shared/ui/external-link'

export default async function PhotoDetailsPage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params

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
							<h3 className='text-lg font-semibold'>Photographer</h3>
							<p>{data.user.name}</p>
							<p className='text-sm'>{data.user.bio}</p>
							<p className='text-sm'>
								Location:
								{data.user.location}
							</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold'>Details</h3>
							<p>
								Likes:
								{data.likes}
							</p>
							<p>
								Dimensions:
								{' '}
								{data.width}
								{' '}
								x
								{' '}
								{data.height}
							</p>
							<p>
								Created:
								{' '}
								{new Date(data.created_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
							</p>
							<p>
								Updated:
								{' '}
								{new Date(data.updated_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
							</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold'>Links</h3>

							<ExternalLink
								href={data.links.html}
								title='View on Unsplash'
							/>

							{data.links.download && (
								<ExternalLink
									href={data.links.download}
									title='Download'
								/>
							)}

						</div>
					</div>
				</div>
			</section>
		</BaseLayout>
	)
}
