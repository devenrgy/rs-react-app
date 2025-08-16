'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'

type Props = {
	data: { urls: { regular: string }, width: number, height: number, alt_description: string, id: string, user: { name: string } }
	isFavorite: boolean
	toggleFavorite: (photo: { id: string, alt_description: string }) => void
}

export const FeedPhotoItem = ({ data, isFavorite, toggleFavorite }: Props) => {
	const searchParams = useSearchParams()
	const query = Object.fromEntries(searchParams.entries())
	const { urls, width, height, alt_description, id, user } = data

	return (
		<figure className='relative flex before:bg-gradient-to-t before:from-neutral-950 before:from-5% before:absolute before:inset-0 before:to-transparent break-inside-avoid flex-col overflow-clip rounded-3xl'>
			<Image
				className='h-full w-full object-cover'
				src={urls.regular}
				width={width}
				height={height}
				fetchPriority='high'
				alt={alt_description}
			/>

			<figcaption className='absolute bottom-0 text-balance text-sm capitalize justify-between inset-x-0 gap-5 flex items-center px-4 py-6'>
				<p className='z-20 text-white'>
					Author:
					{' '}
					{user.name}
				</p>

				<label
					aria-label='Like'
					className={cn(
						'flex z-20 p-3 -mr-3 cursor-pointer text-white duration-200',
						{ 'fill-red-500 text-red-500': isFavorite },
					)}
				>
					<Heart className={cn('fill-white duration-200', { 'fill-red-500': isFavorite })} size={20} />
					<input
						defaultChecked={isFavorite}
						onClick={() => toggleFavorite({ id, alt_description })}
						className='appearance-none'
						type='checkbox'
					/>
				</label>
			</figcaption>

			<Link
				href={{ pathname: '/photo-details/[id]', params: { id: data.id }, query }}
				className='absolute z-10 inset-0'
				aria-label='More details'
			/>
		</figure>
	)
}
