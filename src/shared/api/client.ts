import { createFetch, createSchema } from '@better-fetch/fetch'
import { z } from 'zod'
import { env } from '@/shared/config/env'
import { PhotoByIdResponseSchema, SearchPhotosResponseSchema } from './validations'

export const zodSchema = createSchema({
	'/photos/:id': {
		params: z.object({
			id: z.string(),
		}),
		output: PhotoByIdResponseSchema,
	},
	'/search/photos': {
		query: z.object({
			query: z.string(),
			page: z.number(),
		}),
		output: SearchPhotosResponseSchema,
	},
}, { strict: true })

export const http = createFetch({
	baseURL: env.API_BASE_URL,
	schema: zodSchema,

	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Client-ID ${env.UNSPLASH_CLIENT_ID}`,
		'Accept-Version': 'v1',
	},
})
