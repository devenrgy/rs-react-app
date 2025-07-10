type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestConfig<D = unknown> = {
	method?: HttpMethod
	data?: D
	headers?: Record<string, string>
	params?: Record<string, string | number | boolean>
}

export type HttpClient = {
	request<T = unknown, D = unknown>(url: string, config?: RequestConfig<D>): Promise<T>
	abort(): void
}
