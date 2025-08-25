import { describe, expect, it } from 'vitest'

import { assertIsNonNullable } from './assert-is-non-nullable'

describe('assertIsNonNullable', () => {
	it('should not throw for non-nullable values', () => {
		expect(() => assertIsNonNullable<string>('hello')).not.toThrow()
		expect(() => assertIsNonNullable<number>(42)).not.toThrow()
		expect(() => assertIsNonNullable<object>({})).not.toThrow()
		expect(() => assertIsNonNullable<boolean>(false)).not.toThrow()
	})

	it('should throw for undefined with default error message', () => {
		expect(() => assertIsNonNullable<string>(undefined)).toThrow('Nullish assertion Error: "undefined"')
	})

	it('should throw for null with default error message', () => {
		expect(() => assertIsNonNullable<string>(null)).toThrow('Nullish assertion Error: "null"')
	})

	it('should include additional infos in the error message', () => {
		expect(() => assertIsNonNullable<string>(undefined, 'context', 'test')).toThrow(
			'Nullish assertion Error: "undefined"; context test'
		)
		expect(() => assertIsNonNullable<string>(null, 'field', 123, 'error')).toThrow(
			'Nullish assertion Error: "null"; field 123 error'
		)
	})

	it('should narrow type correctly for non-nullable values', () => {
		const value: string | undefined = 'test'
		expect(() => assertIsNonNullable<string>(value)).not.toThrow()
	})
})
