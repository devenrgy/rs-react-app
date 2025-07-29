export const routes = {
	home: {
		path: '/',
		label: 'Home'
	},
	about: {
		path: '/about',
		label: 'About'
	}
} as const

export type Routes = typeof routes
export type RoutePath = Routes[keyof Routes]['path']
export type RouteLabel = Routes[keyof Routes]['label']
