import { describe, expect, it } from 'vitest'

import { convertToCSV } from '@/lib/utils/convert-to-csv'

describe('convertToCSV', () => {
	it('should return empty string for empty array', () => {
		const result = convertToCSV([])
		expect(result).toBe('')
	})

	it('should generate CSV with default headers', () => {
		const data = [
			{ id: 1, name: 'John' },
			{ id: 2, name: 'Jane' }
		]
		const result = convertToCSV(data)
		expect(result).toBe('id,name\n"1","John"\n"2","Jane"')
	})

	it('should use custom headers when provided', () => {
		const data = [{ id: 1, name: 'John' }]
		const result = convertToCSV(data, { headers: ['name'] })
		expect(result).toBe('name\n"John"')
	})

	it('should escape double quotes in values', () => {
		const data = [{ text: 'He said "Hello"' }]
		const result = convertToCSV(data)
		expect(result).toBe('text\n"He said ""Hello"""')
	})

	it('should handle null and undefined values with empty string', () => {
		const data = [
			{ id: 1, value: null },
			{ id: 2, value: undefined }
		]
		const result = convertToCSV(data)
		expect(result).toBe('id,value\n"1",""\n"2",""')
	})

	it('should format values using custom formatValue function', () => {
		const data = [{ price: 10.5 }]
		const formatValue = (value: unknown) => `$${value}`
		const result = convertToCSV(data, { formatValue })
		expect(result).toBe('price\n"$10.5"')
	})

	it('should maintain header order as specified', () => {
		const data = [
			{ a: 1, b: 2 },
			{ b: 3, a: 4 }
		]
		const result = convertToCSV(data, { headers: ['b', 'a'] })
		expect(result).toBe('b,a\n"2","1"\n"3","4"')
	})
})
