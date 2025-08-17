'use client'

import type { ReactNode } from 'react'
import { createContext, use } from 'react'
import { cn } from '@/shared/lib/cn'
import { useLS } from '@/shared/lib/use-ls'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
	children: ReactNode
	storageKey?: string
}

type ThemeProviderState = {
	theme: Theme
	handleUpdateTheme: () => void
}

const initialState: ThemeProviderState = {
	theme: 'dark',
	handleUpdateTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({ children, storageKey = 'rs-gallery-theme', ...props }: ThemeProviderProps) => {
	const [theme, setTheme] = useLS<Theme>(storageKey, 'light')

	const handleUpdateTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<ThemeContext {...props} value={{ theme, handleUpdateTheme }}>
			<div suppressHydrationWarning className={cn('font-sans antialiased bg-bg text-primary', theme)}>
				{children}
			</div>
		</ThemeContext>
	)
}

export const useTheme = () => {
	const context = use(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}
