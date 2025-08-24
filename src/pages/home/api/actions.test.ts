import { deliverForm } from './actions'

describe('actions', () => {
	it('deliverForm', async () => {
		const initialForm = {
			name: 'test',
			email: 'test',
			password: 'test',
			confirmPassword: 'test',
			country: 'test',
			age: 1,
			avatar: 'test',
			gender: 'test',
			terms: true
		}

		expect(await deliverForm(initialForm)).toBe(initialForm)
	})
})
