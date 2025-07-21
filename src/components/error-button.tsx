import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'

export const ErrorButton = () => {
	const [hasError, setHasError] = useState(false)

	const handleTriggerError = () => setHasError(true)

	if (hasError) {
		throw new Error('Error triggered by button click')
	}

	return (
		<p className='order-1 flex justify-center'>
			<button
				className='flex aspect-square h-full cursor-pointer items-center justify-center rounded-full'
				onClick={handleTriggerError}
				aria-label='Trigger error'
				type='button'
			>
				<TriangleAlert size='32' className='text-love' />
			</button>
		</p>
	)
}
