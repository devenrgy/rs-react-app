'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link, useRouter } from '@/shared/i18n/navigation'

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
	const t = useTranslations('PhotoDetails')
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
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>{t('photographer')}</h3>
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
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>{t('details')}</h3>
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
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>{t('links')}</h3>

						<p>
							<Link
								className='underline-offset-4 hover:underline'
								href={data.links.html}
								rel='noreferrer'
								target='_blank'
							>
								View on Unsplash
							</Link>
						</p>

						{data.links.download && (
							<p>
								<Link
									className='underline-offset-4 hover:underline'
									href={data.links.download}
									rel='noreferrer'
									target='_blank'
								>
									Download
								</Link>
							</p>
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
