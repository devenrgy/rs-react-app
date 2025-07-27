import { Outlet, useNavigation } from 'react-router'

import { Spinner } from '@/components/spinner'
import { Home } from '@/pages/home'

export const HomeLayout = () => {
	const navigation = useNavigation()
	const isNavigating = Boolean(navigation.location)

	return (
		<>
			{isNavigating && <Spinner />}
			<Home />
			<Outlet />
		</>
	)
}
