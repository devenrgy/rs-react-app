'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from '@/shared/i18n/navigation'
import { ExternalLink } from '@/shared/ui/external-link'

type Props = {
	data: {
		urls: {
			regular: string
		}
		alt_description: string
		width: number
		height: number
		likes: number
		created_at: string
		description: string | null
		updated_at: string
		user: {
			name: string
			bio: string | null
			location: string | null
		}
		links: {
			html: string
			download?: string
		}
	}
}

export const PhotoDetailsModal = ({
	data,
}: Props) => {
	const router = useRouter()
	const closeModal = () => {
		router.back()
	}

	return (
		<div className='fixed inset-0 z-40 grid grid-cols-[1fr_400px] overflow-clip bg-black/50 backdrop-blur-md'>
			<div className='starting:scale-0 relative grid place-content-center delay-200 duration-500'>
				<button type='button' className='fixed inset-0 cursor-auto' onClick={closeModal} aria-label='close details' />

				<Image
					src={data.urls.regular}
					width={data.width}
					height={data.height}
					alt={data.alt_description}
					className='z-30 h-[80dvh] w-full rounded-3xl object-cover'
				/>
			</div>
			<aside className='pt-30 starting:translate-x-full relative z-30 col-span-1 h-full overflow-y-auto bg-white px-5 text-black/90 duration-500 dark:bg-neutral-950 dark:text-gray-300'>
				<h2 className='text-love dark:text-rose mb-4 text-balance text-2xl font-bold first-letter:uppercase'>
					{data.alt_description}
				</h2>
				<p className='mb-4'>{data.description}</p>
				<div className='space-y-4'>
					<div>
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Photographer</h3>
						<p>{data.user.name}</p>
						<p className='text-sm'>{data.user.bio}</p>
						<p className='text-sm'>
							Location:
							{data.user.location}
						</p>
					</div>
					<div>
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Details</h3>
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
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Links</h3>

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

				<button
					type='button'
					onClick={closeModal}
					className='bg-pine cursor-pointer dark:bg-iris hover:bg-rose absolute right-5 top-5 z-30 rounded-full p-2 duration-200'
				>
					<X />
				</button>
			</aside>
		</div>
	)
}
