import type { HttpClient, RequestConfig } from '@/types/api'

export class ApiClient {
	private readonly http: HttpClient
	private readonly baseUrl: string

	constructor(http: HttpClient, baseUrl: string) {
		this.http = http
		this.baseUrl = baseUrl
	}

	public async get<T = unknown>(url: string, params?: RequestConfig['params'], headers?: RequestConfig['headers']) {
		return this.http.request<T>(this.getFullUrl(url), {
			method: 'GET',
			params,
			headers
		})
	}

	public async post<T = unknown, D = unknown>(url: string, data?: D, headers?: RequestConfig['headers']) {
		return this.http.request<T, D>(this.getFullUrl(url), {
			method: 'POST',
			data,
			headers
		})
	}

	public abort() {
		this.http.abort()
	}

	private getFullUrl(url: string) {
		return this.baseUrl ? `${this.baseUrl}${url}` : url
	}
}
