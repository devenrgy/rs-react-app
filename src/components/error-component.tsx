import { Component } from 'react'

interface Props {
	title: string
	handleResetError: () => void
	buttonText: string
}

export class ErrorComponent extends Component<Props> {
	render() {
		return (
			<main className='container grid h-dvh place-items-center'>
				<section className='flex flex-col items-center gap-10'>
					<h1 className='text-center text-4xl font-bold text-balance first-letter:capitalize'>{this.props.title}</h1>
					<button
						type='button'
						onClick={this.props.handleResetError}
						className='w-full max-w-[200px] cursor-pointer rounded-3xl bg-pine px-5 py-3 text-xl capitalize transition-colors duration-200 hover:bg-pine/80'
					>
						{this.props.buttonText}
					</button>
				</section>
			</main>
		)
	}
}
