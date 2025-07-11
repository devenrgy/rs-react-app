import { LoaderCircle } from 'lucide-react'
import { type ContextType, PureComponent } from 'react'

import { ErrorComponent } from '@/components/error-component'
import { Header } from '@/components/header'
import { PhotoList } from '@/components/photo-list'
import { hasItems } from '@/lib/utils'
import { Context } from '@/provider'

export class App extends PureComponent {
	static contextType = Context
	declare context: ContextType<typeof Context>

	render() {
		const { isLoading, items, error, searchQuery = 'Gallery', handleResetError } = this.context

		if (error) {
			return <ErrorComponent title={error.message} handleResetError={handleResetError} buttonText='Try Again' />
		}

		return (
			<>
				<Header />

				<main className='pt-40 pb-20 min-h-dvh grid'>
					<section className='container h-full grid grid-rows-[min-content_1fr]'>
						<h1 className='mb-10 text-4xl capitalize font-bold text-balance'>{searchQuery}</h1>

						{isLoading && <LoaderCircle size={48} className='animate-spin text-text place-self-center' />}

						{hasItems(items) && <PhotoList items={items} />}
					</section>
				</main>
			</>
		)
	}
}
