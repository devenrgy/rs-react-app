import { PureComponent } from 'react'

import type { Photo } from '@/types'

interface Props {
	data: Photo
}

export class PhotoCard extends PureComponent<Props> {
	render() {
		const { urls, width, height, alt_description } = this.props.data

		return (
			<div className='flex flex-col border border-highlight-low rounded-3xl overflow-clip'>
				<img
					className='object-cover w-full h-full'
					src={urls.regular}
					width={width}
					height={height}
					fetchPriority='high'
					alt={alt_description}
				/>
			</div>
		)
	}
}
