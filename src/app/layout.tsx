import type { ReactNode } from 'react'
import './styles/index.css'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return children
}
