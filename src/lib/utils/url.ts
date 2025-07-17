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
