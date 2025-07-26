import { LoaderCircle } from 'lucide-react'

export const Loader = () => {
	return (
		<div className='z-100 fixed inset-0 place-content-center grid bg-black/80'>
			<LoaderCircle size={48} aria-label='spinner' className='text-text animate-spin' />
		</div>
	)
}
