import type { RouteLabel, RoutePath } from './routes'
import { routes } from './routes'

export type NavigationItem = {
	label: RouteLabel
	href: RoutePath
}

export const navigation: NavigationItem[] = [
	{
		label: routes.home.label,
		href: routes.home.path
	},
	{
		label: routes.about.label,
		href: routes.about.path
	}
]
