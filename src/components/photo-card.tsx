import { Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import type { Photo } from '@/types'

interface Props {
	data: Photo
}

export const PhotoCard = ({ data }: Props) => {
	const { search } = useLocation()
	const { urls, width, height, alt_description } = data

	return (
		<figure className='relative flex break-inside-avoid flex-col overflow-clip rounded-3xl shadow-md'>
			<p className='overflow-clip'>
				<img
					className='group-hover:scale-101 h-full w-full object-cover duration-200'
					src={urls.regular}
					width={width}
					height={height}
					fetchPriority='high'
					alt={alt_description}
				/>
			</p>

			<figcaption className='dark:bg-highlight-low bg-pine flex flex-col gap-5 rounded-b-3xl px-4 py-6 text-center'>
				<p className='dark:text-text z-20 text-balance text-sm text-white first-letter:capitalize'>{alt_description}</p>

				<Link
					to={{ pathname: `/${data.id}`, search }}
					className='hover:bg-rose dark:bg-pine dark:text-text z-10 inline-flex cursor-pointer self-end rounded-full bg-black/20 px-4 py-2 text-sm text-white duration-200 before:absolute before:inset-0 hover:text-base'
				>
					More details
				</Link>
			</figcaption>

			<button
				aria-label='Like'
				className='bg-foam hover:bg-love shadow-pine/50 hover:shadow-love/50 absolute right-5 top-2 z-20 cursor-pointer rounded-full p-2 text-white shadow-sm duration-200'
			>
				<Heart className='fill-white' />
			</button>
		</figure>
	)
}
