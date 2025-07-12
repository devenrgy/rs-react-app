import { Component, type ReactNode } from 'react'

import { ErrorComponent } from '@/components/error-component'

interface Props {
	children: ReactNode
}

export class ErrorBoundary extends Component<Props> {
	state = {
		hasError: false
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error) {
		console.error('ErrorBoundary caught:', error)
	}

	handleResetError = () => {
		this.setState({ hasError: false })
	}

	render() {
		if (this.state.hasError) {
			return (
				<ErrorComponent title='Something went wrong!' handleResetError={this.handleResetError} buttonText='Try again' />
			)
		}

		return this.props.children
	}
}
