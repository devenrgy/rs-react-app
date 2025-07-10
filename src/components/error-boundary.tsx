import { PureComponent, type ReactNode } from 'react'

import { ErrorComponent } from '@/components/error-component'

interface State {
	error: Error | null
}

interface Props {
	children: ReactNode
}

export class ErrorBoundary extends PureComponent<Props, State> {
	state: State = {
		error: null
	}

	static getDerivedStateFromError(error: Error) {
		return { error }
	}

	componentDidCatch(error: Error) {
		console.error('ErrorBoundary caught:', error)
	}

	handleResetError = () => {
		this.setState({ error: null })
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorComponent
					title='Something went wrong!'
					handleResetError={this.handleResetError}
					buttonText='Reset Error'
				/>
			)
		}

		return this.props.children
	}
}
