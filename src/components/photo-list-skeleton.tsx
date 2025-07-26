export const PhotoListSkeleton = () => {
	return (
		<ul className='gap-5 lg:gap-x-10 space-y-5 lg:space-y-10 columns-1 sm:columns-2 lg:columns-3'>
			{Array.from({ length: 9 }, (_, i) => i + 1).map(item => (
				<li key={item} className='bg-white/10 rounded-3xl w-full max-w-md h-[600px] animate-pulse' />
			))}
		</ul>
	)
}
