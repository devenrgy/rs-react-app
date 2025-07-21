import { ErrorButton } from '@/components/error-button'
import { SearchForm } from '@/components/search-form'

export const Header = () => {
	return (
		<header className='fixed inset-x-0 container grid items-center gap-10 bg-base py-10 sm:grid-cols-[1fr_auto]'>
			<SearchForm />
			<ErrorButton />
		</header>
	)
}
