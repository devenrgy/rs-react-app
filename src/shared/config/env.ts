import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		API_BASE_URL: z.string(),
		UNSPLASH_CLIENT_ID: z.string(),
	},
	runtimeEnv: {
		API_BASE_URL: process.env.API_BASE_URL,
		UNSPLASH_CLIENT_ID: process.env.UNSPLASH_CLIENT_ID,
	},
})
