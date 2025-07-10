import { PureComponent } from 'react'

interface Props {
	title: string
	handleResetError: () => void
	buttonText: string
}

export class ErrorComponent extends PureComponent<Props> {
	render() {
		return (
			<main className='container h-dvh grid place-items-center'>
				<section className='flex flex-col gap-10 items-center'>
					<h1 className='text-balance text-center text-4xl font-bold'>{this.props.title}</h1>
					<button
						onClick={this.props.handleResetError}
						className='max-w-[200px] cursor-pointer w-full py-3 px-5 bg-pine rounded-3xl text-xl hover:bg-pine/80 duration-200 transition-colors'
					>
						{this.props.buttonText}
					</button>
				</section>
			</main>
		)
	}
}
