export const FeedPhotoListSkeleton = () => {
	return (
		<ul className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-x-10 lg:space-y-10'>
			{Array.from({ length: 10 }, (_, index) => (
				<li key={index}>
					<div className='animate-pulse w-[480px] break-inside-avoid h-[700px] rounded-3xl bg-secondary/50' />
				</li>
			))}
		</ul>
	)
}
