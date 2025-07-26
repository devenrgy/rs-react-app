import type { Photo } from '@/types'
import { X } from 'lucide-react'
import { Link, useLoaderData, useLocation } from 'react-router'

export const PhotoDetails = () => {
	const data = useLoaderData<Photo>()
	const { search } = useLocation()

	const { urls, width, height, alt_description, user, created_at, likes, links, updated_at } = data
	const { name, username } = user

	return (
		<div className='z-40 fixed inset-0 grid md:grid-cols-[1fr_400px]'>
			<div className='hidden relative place-content-center md:grid'>
				<Link
					className='absolute bg-black/80 w-full h-full cursor-auto'
					to={{ pathname: '..', search }}
					preventScrollReset
				/>
				<div className='z-50 h-[90vh]'>
					<img
						className='rounded-4xl w-full h-full object-cover'
						src={urls.regular}
						width={width}
						height={height}
						fetchPriority='high'
						alt={alt_description || ''}
					/>
				</div>
			</div>
			<div aria-label='sidebar' className='bg-neutral-950 px-10 py-20 border-l border-l-overlay overflow-y-auto'>
				<div className='space-y-6'>
					<div>
						<h2 className='font-semibold text-white text-2xl text-balance'>
							Photo by
							{' '}
							{name || username}
						</h2>
						<p className='text-neutral-400 text-sm'>
							@
							{username}
						</p>
					</div>
					<div>
						<h3 className='font-medium text-white text-lg'>Photo Details</h3>
						<p className='text-neutral-300 text-sm first-letter:capitalize'>{alt_description || 'No description available'}</p>
						<p className='text-neutral-300 text-sm'>
							Dimensions:
							{' '}
							{width}
							x
							{height}
						</p>
						<p className='text-neutral-300 text-sm'>
							Likes:
							{' '}
							{likes}
						</p>
						<p className='text-neutral-300 text-sm'>
							Created:
							{' '}
							{new Date(created_at).toLocaleDateString()}
						</p>
						<p className='text-neutral-300 text-sm'>
							Last Updated:
							{' '}
							{new Date(updated_at).toLocaleDateString()}
						</p>
					</div>
					<div>
						<h3 className='font-medium text-white text-lg'>Links</h3>
						<p className='text-neutral-300 text-sm'>
							Self:
							{' '}
							<Link to={links.self} className='text-iris hover:underline' target='_blank' rel='noopener noreferrer'>View</Link>
						</p>
						<p className='text-neutral-300 text-sm'>
							HTML:
							{' '}
							<Link to={links.html} className='text-iris hover:underline' target='_blank' rel='noopener noreferrer'>View</Link>
						</p>
						<p className='text-neutral-300 text-sm'>
							Download:
							{' '}
							<Link to={links.download} className='text-iris hover:underline' target='_blank' rel='noopener noreferrer'>Download</Link>
						</p>
					</div>
				</div>
				<Link
					to={{ pathname: '..', search }}
					preventScrollReset
					className='top-5 right-5 absolute place-content-center grid bg-iris hover:bg-iris/80 rounded-full size-10 aspect-square text-base duration-200 cursor-pointer'
					aria-label='Close details'
				>
					<X />
				</Link>
			</div>
		</div>
	)
}
