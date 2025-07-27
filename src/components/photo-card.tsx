import { Link, useLocation } from 'react-router'

import type { Photo } from '@/types'

interface Props {
	data: Photo
}

export const PhotoCard = ({ data }: Props) => {
	const { search } = useLocation()
	const { urls, width, height, alt_description } = data

	return (
		<figure className='relative flex break-inside-avoid flex-col overflow-clip rounded-3xl border border-highlight-low'>
			<img
				className='h-full w-full object-cover'
				src={urls.regular}
				width={width}
				height={height}
				fetchPriority='high'
				alt={alt_description}
			/>

			<figcaption className='bg-highlight-med px-4 py-6 text-center'>
				<p className='text-sm text-balance first-letter:capitalize'>{alt_description}</p>
			</figcaption>

			<Link className='before:absolute before:inset-0' to={{ pathname: `/${data.id}`, search }} />
		</figure>
	)
}
