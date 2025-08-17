'use client'

import { useEffect, useState } from 'react'
import { safeJsonParse } from './helpers'

export const useLS = <T>(key: string, defaultValue: T) => {
	const [value, setValue] = useState<T>(defaultValue)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setValue(safeJsonParse(window.localStorage.getItem(key)) || defaultValue)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}
