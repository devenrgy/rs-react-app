import { Outlet, ScrollRestoration } from 'react-router'

import { Header } from '@/components/header'

export type RootContext = {
	initialQuery: string
}

export const Root = () => {
	return (
		<>
			<Header />
			<Outlet />
			<ScrollRestoration />
		</>
	)
}
