import { FetchHttpClient } from '@/lib/api/adapters/fetch'
import { ApiClient } from '@/lib/api/client'

const fetchClient = new FetchHttpClient()

export const api = new ApiClient(fetchClient, import.meta.env.VITE_API_URL)
