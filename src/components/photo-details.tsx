import { X } from 'lucide-react'
import { Link, useLoaderData, useLocation } from 'react-router'

import type { Photo } from '@/types'

export const PhotoDetails = () => {
	const { search } = useLocation()
	const data = useLoaderData<Photo>()

	return (
		<div className='fixed inset-0 z-20 grid grid-cols-[1fr_500px] bg-black/80'>
			<div className='relative grid place-content-center'>
				<Link className='fixed inset-0' to={{ pathname: '..', search }} aria-label='close details' />

				<img
					src={data.urls.regular}
					width={data.width}
					height={data.height}
					alt={data.alt_description}
					className='z-30 h-[90dvh] w-full rounded-3xl object-cover'
				/>
			</div>
			<div className='z-30 col-span-1 h-full overflow-y-auto bg-gray-900 p-6 text-white'>
				<h2 className='mb-4 text-2xl font-bold text-balance first-letter:uppercase'>{data.alt_description}</h2>
				<p className='mb-4 text-gray-300'>{data.description}</p>
				<div className='space-y-4'>
					<div>
						<h3 className='text-lg font-semibold'>Photographer</h3>
						<p>{data.user.name}</p>
						<p className='text-sm text-gray-400'>{data.user.bio}</p>
						<p className='text-sm text-gray-400'>Location: {data.user.location}</p>
					</div>
					<div>
						<h3 className='text-lg font-semibold'>Details</h3>
						<p>Likes: {data.likes}</p>
						<p>
							Dimensions: {data.width} x {data.height}
						</p>
						<p>Created: {new Date(data.created_at).toLocaleDateString()}</p>
						<p>Updated: {new Date(data.updated_at).toLocaleDateString()}</p>
					</div>
					<div>
						<h3 className='text-lg font-semibold'>Links</h3>
						<p>
							<a
								href={data.links.html}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-400 hover:underline'
							>
								View on Unsplash
							</a>
						</p>
						<p>
							<a
								href={data.links.download}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-400 hover:underline'
							>
								Download
							</a>
						</p>
					</div>
				</div>
			</div>

			<Link className='absolute top-5 right-5 z-30 rounded-full bg-iris p-2 text-base' to={{ pathname: '..', search }}>
				<X />
			</Link>
		</div>
	)
}
