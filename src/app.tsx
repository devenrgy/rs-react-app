import { LoaderCircle } from 'lucide-react'
import { Component, type ContextType } from 'react'

import { ErrorComponent } from '@/components/error-component'
import { Header } from '@/components/header'
import { PhotoList } from '@/components/photo-list'
import { hasItems } from '@/lib/utils'
import { Context } from '@/provider'

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

				<main className='pt-40 pb-20 min-h-dvh grid'>
					<section className='container h-full grid grid-rows-[min-content_1fr]'>
						<h1 className='mb-10 text-4xl capitalize font-bold text-balance'>{searchQuery}</h1>

						{isLoading ? (
							<div className='flex max-w-[200px] w-full flex-col gap-10 place-self-center items-center'>
								<LoaderCircle size={48} className='animate-spin text-text' />

								<button
									type='button'
									onClick={abortRequest}
									className='max-w-[200px] capitalize cursor-pointer w-full py-3 px-5 bg-pine rounded-3xl text-xl hover:bg-pine/80 duration-200 transition-colors'
								>
									Cancel
								</button>
							</div>
						) : hasItems(items) ? (
							<PhotoList items={items} />
						) : (
							<div className='flex flex-col gap-5 place-self-center items-center'>
								<p className='text-3xl text-balance text-center'>Nothing found</p>

								<button
									type='button'
									onClick={fetchPhotos}
									className='max-w-[200px] capitalize cursor-pointer w-full py-3 px-5 bg-pine rounded-3xl text-xl hover:bg-pine/80 duration-200 transition-colors'
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
