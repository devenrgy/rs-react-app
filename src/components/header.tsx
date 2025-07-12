import { Component } from 'react'

import { ErrorButton } from '@/components/error-button'
import { SearchForm } from '@/components/search-form'

export class Header extends Component {
	render() {
		return (
			<header className='inset-x-0 bg-base fixed container py-10 grid sm:grid-cols-[1fr_auto] gap-10 items-center'>
				<SearchForm />
				<ErrorButton />
			</header>
		)
	}
}
