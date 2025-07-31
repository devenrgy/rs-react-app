import { renderHook, waitFor } from '@testing-library/react'
import type { Mocked } from 'vitest'

import { useLS } from '@/lib/hooks/use-ls'

const localStorageMock: Mocked<Storage> = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	key: vi.fn(),
	length: 0,
	clear: vi.fn()
}

describe('useLS', () => {
	const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

	beforeEach(() => {
		vi.spyOn(window, 'localStorage', 'get').mockReturnValue(localStorageMock)
	})

	it('should initialize with initialValue when localStorage is empty', () => {
		const initialValue = 'test'
		const key = 'key'
		const { result } = renderHook(() => useLS(key, initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(initialValue))
	})

	it('should initialize with value from localStorage', () => {
		const storedValue = 'stored'
		localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue))

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		expect(result.current[0]).toBe(storedValue)
	})

	it('should set new value and update localStorage', async () => {
		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		const newValue = 'updated'

		result.current[1](newValue)

		await waitFor(() => {
			expect(result.current[0]).toBe(newValue)
		})

		expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(newValue))
	})

	it('should delete value from localStorage and reset to initialValue', async () => {
		const initialValue = 'test'
		const key = 'key'

		const storedValue = 'stored'
		localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue))

		const { result } = renderHook(() => useLS(key, initialValue))

		result.current[2]()

		await waitFor(() => {
			expect(result.current[0]).toBe(initialValue)
		})

		expect(localStorageMock.removeItem).toHaveBeenCalledWith(key)
	})

	it('should handle get errors gracefully', () => {
		localStorageMock.getItem.mockImplementationOnce(() => {
			throw new Error('Storage error')
		})

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(consoleErrorSpy).toHaveBeenCalled()
	})

	it('should handle null value from localStorage correctly', () => {
		localStorageMock.getItem.mockReturnValue('null')

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		expect(result.current[0]).toBe(null)
	})

	it('should handle invalid JSON in localStorage', () => {
		localStorageMock.getItem.mockReturnValue('invalid json')

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(consoleErrorSpy).toHaveBeenCalled()
	})

	it('should handle errors during set operation gracefully', async () => {
		localStorageMock.setItem.mockImplementationOnce(() => {
			throw new Error('Set error')
		})

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		const newValue = 'updated'

		result.current[1](newValue)

		expect(consoleErrorSpy).toHaveBeenCalled()
	})

	it('should handle errors during delete operation gracefully', async () => {
		localStorageMock.removeItem.mockImplementationOnce(() => {
			throw new Error('Delete error')
		})

		const initialValue = 'test'
		const key = 'key'

		const { result } = renderHook(() => useLS(key, initialValue))

		result.current[2]()

		await waitFor(() => {
			expect(result.current[0]).toBe(initialValue)
		})

		expect(consoleErrorSpy).toHaveBeenCalled()
		expect(localStorageMock.removeItem).toHaveBeenCalledWith('key')
	})
})
