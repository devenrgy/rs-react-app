import { useEffect, useState } from 'react'

export const useFetch = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		let isMounted = true

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(url, options)
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`)
				}
				const result = await response.json()
				if (isMounted) {
					setData(result)
				}
			} catch (err) {
				if (isMounted) {
					setError(err as Error)
				}
			} finally {
				if (isMounted) {
					setIsLoading(false)
				}
			}
		}

		fetchData()

		return () => {
			isMounted = false
		}
	}, [url, options])

	return { data, isLoading, error }
}
