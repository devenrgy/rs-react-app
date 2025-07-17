import { Component } from 'react'

import { ErrorButton } from '@/components/error-button'
import { SearchForm } from '@/components/search-form'

export class Header extends Component {
	render() {
		return (
			<header className='fixed inset-x-0 container grid items-center gap-10 bg-base py-10 sm:grid-cols-[1fr_auto]'>
				<SearchForm />
				<ErrorButton />
			</header>
		)
	}
}
