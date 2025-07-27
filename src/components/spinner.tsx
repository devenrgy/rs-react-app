import { LoaderCircle } from 'lucide-react'

export const Spinner = () => {
	return (
		<div className='fixed inset-0 z-100 grid place-content-center bg-black/50'>
			<LoaderCircle size={48} aria-label='spinner' className='animate-spin text-text' />
		</div>
	)
}
