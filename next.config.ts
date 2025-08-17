import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin({
	requestConfig: './src/shared/i18n/request.ts',
	experimental: {
		createMessagesDeclaration: './src/shared/i18n/locales/en.json',
	},
})

const config: NextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
	},
}

export default withNextIntl(config)
