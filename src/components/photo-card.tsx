import { PureComponent } from 'react'

import type { Photo } from '@/types'

interface Props {
	data: Photo
}

export class PhotoCard extends PureComponent<Props> {
	render() {
		const { urls, width, height, alt_description } = this.props.data

		return (
			<div className='flex break-inside-avoid flex-col border border-highlight-low rounded-3xl overflow-clip'>
				<img
					className='object-cover w-full h-full'
					src={urls.regular}
					width={width}
					height={height}
					fetchPriority='high'
					alt={alt_description}
				/>

				<div className='py-6 px-4 bg-highlight-med text-center'>
					<p className='first-letter:capitalize text-sm text-balance'>{alt_description}</p>
				</div>
			</div>
		)
	}
}
