import { LoaderCircle } from 'lucide-react'

export const Spinner = () => {
	return (
		<div className='z-100 fixed inset-0 grid place-content-center bg-black/50'>
			<LoaderCircle size={48} aria-label='spinner' className='text-text animate-spin' />
		</div>
	)
}
