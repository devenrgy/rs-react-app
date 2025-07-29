import { createContext, type ReactNode, use, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light')

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}

export const useThemeContext = () => {
	const context = use(ThemeContext)

	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider')
	}

	return context
}
