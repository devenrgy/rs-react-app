import type { HttpClient, RequestConfig } from '@/types/api'

export class FetchHttpClient implements HttpClient {
	private controller: AbortController | null = null

	async request<T = unknown, D = unknown>(url: string, config: RequestConfig<D> = {}) {
		this.abort()

		this.controller = new AbortController()

		const { method = 'GET', data, headers = {}, params } = config

		const urlWithParams = new URL(url)

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				urlWithParams.searchParams.append(key, String(value))
			})
		}

		try {
			const response = await fetch(urlWithParams.toString(), {
				method,
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				body: data ? JSON.stringify(data) : undefined,
				signal: this.controller.signal
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			return response.json() as Promise<T>
		} finally {
			this.controller = null
		}
	}

	abort() {
		if (this.controller) {
			this.controller.abort()
		}
	}
}
