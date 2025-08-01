import { X } from 'lucide-react'
import { Link, useLoaderData, useLocation } from 'react-router'

import type { Photo } from '@/types'

export const PhotoDetails = () => {
	const { search } = useLocation()
	const data = useLoaderData<Photo>()

	return (
		<div className='fixed inset-0 z-40 grid grid-cols-[1fr_400px] bg-black/50 backdrop-blur-md'>
			<div className='relative grid place-content-center'>
				<Link className='fixed inset-0 cursor-auto' to={{ pathname: '..', search }} aria-label='close details' />
				<img
					src={data.urls.regular}
					width={data.width}
					height={data.height}
					alt={data.alt_description}
					className='z-30 h-[80dvh] w-full rounded-3xl object-cover'
				/>
			</div>
			<aside className='pt-30 z-30 col-span-1 h-full overflow-y-auto bg-white px-5 text-black/90 dark:bg-neutral-950 dark:text-gray-300'>
				<h2 className='text-love dark:text-rose mb-4 text-balance text-2xl font-bold first-letter:uppercase'>
					{data.alt_description}
				</h2>
				<p className='mb-4'>{data.description}</p>
				<div className='space-y-4'>
					<div>
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Photographer</h3>
						<p>{data.user.name}</p>
						<p className='text-sm'>{data.user.bio}</p>
						<p className='text-sm'>Location: {data.user.location}</p>
					</div>
					<div>
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Details</h3>
						<p>Likes: {data.likes}</p>
						<p>
							Dimensions: {data.width} x {data.height}
						</p>
						<p>Created: {new Date(data.created_at).toLocaleDateString()}</p>
						<p>Updated: {new Date(data.updated_at).toLocaleDateString()}</p>
					</div>
					<div>
						<h3 className='text-pine dark:text-foam text-lg font-semibold'>Links</h3>
						<p>
							<Link
								to={data.links.html}
								target='_blank'
								rel='noopener noreferrer'
								className='underline-offset-5 hover:underline'
							>
								View on Unsplash
							</Link>
						</p>
						<p>
							<Link
								to={data.links.download}
								target='_blank'
								rel='noopener noreferrer'
								className='underline-offset-5 hover:underline'
							>
								Download
							</Link>
						</p>
					</div>
				</div>
			</aside>

			<Link
				className='bg-pine dark:bg-iris hover:bg-rose absolute right-5 top-5 z-30 rounded-full p-2 text-white duration-200 dark:text-base'
				to={{ pathname: '..', search }}
			>
				<X />
			</Link>
		</div>
	)
}
