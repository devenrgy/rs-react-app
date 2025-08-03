import { describe, expect, it, vi } from 'vitest'

import { getBlobData } from '@/lib/utils/get-blob-data'

describe('getBlobData', () => {
	const mockBlob = new Blob(['test'], { type: 'text/plain' })
	const mockDataArray = [
		{ id: 1, name: 'Test' },
		{ id: 2, name: 'Example' }
	]
	const mockDataString = 'test string data'
	const mockFormat = 'text/csv'

	it('should use onCreateBlob when provided', () => {
		const mockOnCreateBlob = vi.fn().mockReturnValue(mockBlob)
		const result = getBlobData(mockDataArray, mockFormat, mockOnCreateBlob)

		expect(mockOnCreateBlob).toHaveBeenCalledWith(mockDataArray, mockFormat)
		expect(result).toBe(mockBlob)
	})

	it('should convert array data to CSV blob when no onCreateBlob provided', () => {
		const result = getBlobData(mockDataArray, mockFormat)

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe(mockFormat)
		expect(result.size).toBeGreaterThan(0)
	})

	it('should create blob from string data when data is not array', () => {
		const result = getBlobData(mockDataString, mockFormat)

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe(mockFormat)
		expect(result.size).toBe(mockDataString.length)
	})

	it('should create blob from BlobPart data when data is not array', () => {
		const buffer = new ArrayBuffer(8)
		const result = getBlobData(buffer, 'application/octet-stream')

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe('application/octet-stream')
		expect(result.size).toBe(buffer.byteLength)
	})

	it('should handle empty string data correctly', () => {
		const emptyString = ''
		const result = getBlobData(emptyString, mockFormat)

		expect(result).toBeInstanceOf(Blob)
		expect(result.size).toBe(0)
	})

	it('should preserve the provided format in the blob', () => {
		const customFormat = 'application/json'
		const result = getBlobData(mockDataString, customFormat)

		expect(result.type).toBe(customFormat)
	})
})
