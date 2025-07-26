import type { ReactNode } from 'react'
import { Component } from 'react'

import { ErrorFallback } from '@/components/error-fallback'

type Props = {
	children: ReactNode
}

export class ErrorBoundary extends Component<Props> {
	state = {
		hasError: false,
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
			return <ErrorFallback showButton handleResetError={this.handleResetError} />
		}

		return this.props.children
	}
}
