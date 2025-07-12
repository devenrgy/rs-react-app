type HttpMethod = 'GET' | 'POST'

export type RequestConfig<D = unknown> = {
	method?: HttpMethod
	data?: D
	headers?: Record<string, string>
	params?: Record<string, string | number | boolean>
}
