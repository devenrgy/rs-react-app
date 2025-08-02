import { createContext, type ReactNode, use } from 'react'

import { useLS } from '@/lib/hooks/use-ls'
import { cn } from '@/lib/utils/helpers'

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
	handleUpdateTheme: () => null
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({ children, storageKey = 'rs-gallery-theme', ...props }: ThemeProviderProps) => {
	const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	const [theme, setTheme] = useLS<Theme>(storageKey, systemTheme)

	const handleUpdateTheme = () => {
		document.startViewTransition(() => {
			setTheme(theme === 'light' ? 'dark' : 'light')
		})
	}

	return (
		<ThemeContext {...props} value={{ theme, handleUpdateTheme }}>
			<div className={cn('dark:text-text bg-white font-sans text-base font-medium dark:bg-neutral-950', theme)}>
				{children}
			</div>
		</ThemeContext>
	)
}

export const useTheme = () => {
	const context = use(ThemeContext)

	if (!context) throw new Error('useTheme must be used within a ThemeProvider')

	return context
}
