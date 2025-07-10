import { TriangleAlert } from 'lucide-react'
import { PureComponent } from 'react'

export class ErrorButton extends PureComponent {
	state = { hasError: false }

	triggerError = () => this.setState({ hasError: true })

	render() {
		if (this.state.hasError) {
			throw new Error('Error triggered by button click')
		}

		return (
			<p className='flex justify-center order-1'>
				<button
					className='flex items-center justify-center rounded-full cursor-pointer aspect-square h-full'
					onClick={this.triggerError}
					aria-label='Trigger error'
				>
					<TriangleAlert size='32' className='text-love' />
				</button>
			</p>
		)
	}
}
