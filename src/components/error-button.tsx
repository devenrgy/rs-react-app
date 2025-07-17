import { TriangleAlert } from 'lucide-react'
import { Component } from 'react'

export class ErrorButton extends Component {
	state = { hasError: false }

	triggerError = () => this.setState({ hasError: true })

	render() {
		if (this.state.hasError) {
			throw new Error('Error triggered by button click')
		}

		return (
			<p className='order-1 flex justify-center'>
				<button
					className='flex aspect-square h-full cursor-pointer items-center justify-center rounded-full'
					onClick={this.triggerError}
					aria-label='Trigger error'
					type='button'
				>
					<TriangleAlert size='32' className='text-love' />
				</button>
			</p>
		)
	}
}
