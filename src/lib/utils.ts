export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

export const addUrlParams = (url: string, params: Record<string, unknown>) => {
	const newUrl = new URL(url)

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			newUrl.searchParams.append(key, String(value))
		}
	})

	return newUrl
}

export const getPageUrlParams = (name: string) => new URLSearchParams(window.location.search).get(name) ?? undefined

export const setPageUrlParams = (name: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search)
	searchParams.set(name, value)
	window.history.pushState({}, '', `${window.location.pathname}?${searchParams}`)
}

export const removePageUrlParams = (name: string) => {
	const searchParams = new URLSearchParams(window.location.search)
	searchParams.delete(name)
	const newUrl = searchParams.toString() ? `${window.location.pathname}?${searchParams}` : window.location.pathname
	window.history.pushState({}, '', newUrl)
}

export const setLocalStorage = <T>(key: string, value: T) => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error('LocalStorage save error:', error)
	}
}

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
	try {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : defaultValue
	} catch (error) {
		console.error('LocalStorage read error:', error)
		return defaultValue
	}
}

export const removeLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error('LocalStorage remove error:', error)
	}
}
