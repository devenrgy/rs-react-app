import { createBrowserRouter } from 'react-router'

import { NotFound } from '@/components/not-found'
import { About } from '@/pages/about'
import { Home } from '@/pages/home'
import { Root } from '@/pages/root'

export const routes = createBrowserRouter([
	{
		Component: Root,
		children: [
			{
				path: '/',
				Component: Home
			},
			{
				path: '/about',
				Component: About
			}
		]
	},
	{
		path: '*',
		Component: NotFound
	},
	{
		path: '404',
		Component: NotFound
	}
])
