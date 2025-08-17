import type { FavoritePhoto } from '../model/favorite-photo-store'
import { Download, Trash } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type Props = {
	items: FavoritePhoto[]
	className?: string
	handleClearAll: () => void
	handleDownload: () => void
}

export const FeedFavorites = ({ items, className, handleClearAll, handleDownload }: Props) => {
	return (
		<div className={cn('w-full max-w-[320px] overflow-clip rounded-3xl md:max-w-sm', className)}>
			<div className='max-h-90 grid grid-rows-[1fr_min-content_min-content] rounded-3xl bg-secondary text-sm/6 shadow-lg ring-1 ring-gray-900/5'>
				<ul className='scrollbar-thin scrollbar-thumb-rose scrollbar-track-white dark:scrollbar-thumb-highlight-high dark:scrollbar-track-base grid h-full overflow-y-auto'>
					{items.map(({ id, alt_description }) => (
						<li className='dark:even:bg-highlight-med even:bg-rose p-4' key={id}>
							<p>{id}</p>
							<p className='line-clamp-1' title={alt_description}>
								{alt_description}
							</p>
						</li>
					))}
				</ul>

				<p className='dark:bg-highlight-low bg-rose p-1 text-center'>
					{items.length}
					{' '}
					{items.length === 1 ? 'item is' : 'items are'}
					{' '}
					selected
				</p>

				<div className='dark:bg-highlight-high dark:text-text grid grid-cols-2'>
					<button
						onClick={handleClearAll}
						type='button'
						className='dark:hover:bg-love hover:bg-love flex cursor-pointer items-center justify-center gap-x-2.5 p-3 font-semibold duration-200 hover:text-white dark:hover:text-white'
					>
						<Trash size='20' />
						Clear All
					</button>
					<button
						type='button'
						onClick={handleDownload}
						className='dark:hover:bg-pine hover:bg-pine dark:hover:text-text flex cursor-pointer items-center justify-center gap-x-2.5 p-3 font-semibold duration-200 hover:text-white'
					>
						<Download size='20' />
						Download
					</button>
				</div>
			</div>
		</div>
	)
}
