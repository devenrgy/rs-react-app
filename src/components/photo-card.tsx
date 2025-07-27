import { Link, useLocation } from 'react-router'

import type { Photo } from '@/types'

interface Props {
	data: Photo
}

export const PhotoCard = ({ data }: Props) => {
	const { search } = useLocation()
	const { urls, width, height, alt_description } = data

	return (
		<figure className='border-highlight-low shadow-iris/30 group relative flex break-inside-avoid flex-col overflow-clip rounded-3xl border duration-200 hover:shadow-lg'>
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

			<figcaption className='bg-overlay flex flex-col gap-5 px-4 py-6 text-center'>
				<p className='text-balance text-sm first-letter:capitalize'>{alt_description}</p>

				<button className='group-hover:bg-pine/80 bg-pine inline-flex self-end rounded-full px-4 py-2 text-sm duration-200'>
					More details
				</button>
			</figcaption>

			<Link className='before:absolute before:inset-0' to={{ pathname: `/${data.id}`, search }} />
		</figure>
	)
}
