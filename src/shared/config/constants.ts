export const PORT = process.env.PORT || 3000
export const HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: `http://localhost:${PORT}`

export const QUERY_PARAM_KEY = 'query'
export const PAGE_PARAM_KEY = 'page'

export const DEFAULT_QUERY = 'Pine'
export const DEFAULT_PAGE = 1

export const STORAGE_SEARCH_KEY = 'pulse-query'
export const STORAGE_PAGE_KEY = 'pulse-page'
