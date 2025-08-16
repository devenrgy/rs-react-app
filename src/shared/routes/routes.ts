export const routes = {
	home: {
		path: '/',
		label: 'home',
	},
	about: {
		path: '/about',
		label: 'about',
	},
} as const

export type Routes = typeof routes
export type RoutePath = Routes[keyof Routes]['path']
export type RouteLabel = Routes[keyof Routes]['label']
