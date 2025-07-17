import { LoaderCircle } from 'lucide-react'
import { Component, type ContextType } from 'react'

import { ErrorComponent } from '@/components/error-component'
import { Header } from '@/components/header'
import { PhotoList } from '@/components/photo-list'
import { Context } from '@/provider'
import { hasItems } from '@/utils/helpers'

export class App extends Component {
	static contextType = Context
	declare context: ContextType<typeof Context>

	render() {
		const {
			abortRequest,
			fetchPhotos,
			isLoading,
			items,
			error,
			searchQuery = 'Gallery',
			handleResetError
		} = this.context

		if (error) {
			return <ErrorComponent title={error.message} handleResetError={handleResetError} buttonText='Try Again' />
		}

		return (
			<>
				<Header />

				<main className='grid min-h-dvh pt-40 pb-20'>
					<section className='container grid h-full grid-rows-[min-content_1fr]'>
						<h1 className='mb-10 text-4xl font-bold text-balance capitalize'>{searchQuery}</h1>

						{isLoading ? (
							<div className='flex w-full max-w-[200px] flex-col items-center gap-10 place-self-center'>
								<LoaderCircle size={48} className='animate-spin text-text' />

								<button
									type='button'
									onClick={abortRequest}
									className='w-full max-w-[200px] cursor-pointer rounded-3xl bg-pine px-5 py-3 text-xl capitalize transition-colors duration-200 hover:bg-pine/80'
								>
									Cancel
								</button>
							</div>
						) : hasItems(items) ? (
							<PhotoList items={items} />
						) : (
							<div className='flex flex-col items-center gap-5 place-self-center'>
								<p className='text-center text-3xl text-balance'>Nothing found</p>

								<button
									type='button'
									onClick={fetchPhotos}
									className='w-full max-w-[200px] cursor-pointer rounded-3xl bg-pine px-5 py-3 text-xl capitalize transition-colors duration-200 hover:bg-pine/80'
								>
									Retry
								</button>
							</div>
						)}
					</section>
				</main>
			</>
		)
	}
}
