import { useEffect, useState } from 'react'
import { safeJsonParseThrow } from './helpers'

export const useLS = <T>(key: string, defaultValue: T) => {
	const [value, setValue] = useState<T>(() => {
		try {
			const storedValue = localStorage.getItem(key)

			return storedValue ? safeJsonParseThrow(storedValue) : defaultValue
		} catch (error) {
			console.error('Error parsing localStorage value:', error)
			return defaultValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}
