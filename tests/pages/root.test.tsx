import { setupWithRouter } from 'tests/vitest.setup'

import { Root } from '@/pages/root'

describe('Root', () => {
	it('should render ThemeProvider, ErrorBoundary, and Header', () => {
		const { container } = setupWithRouter(<Root />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
