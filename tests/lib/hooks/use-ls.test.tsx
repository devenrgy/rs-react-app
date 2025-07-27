import { act, renderHook } from '@testing-library/react'
import type { MockInstance } from 'vitest'

import { useLS } from '@/lib/hooks/use-ls'

const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn()
}

describe('useLS', () => {
	let consoleErrorSpy: MockInstance

	beforeEach(() => {
		vi.spyOn(window, 'localStorage', 'get').mockReturnValue(localStorageMock as unknown as Storage)
		localStorageMock.getItem.mockClear()
		localStorageMock.setItem.mockClear()
		localStorageMock.removeItem.mockClear()

		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleErrorSpy.mockRestore()
		vi.restoreAllMocks()
	})

	it('initializes with initialValue when localStorage is empty', () => {
		localStorageMock.getItem.mockReturnValue(null)
		const initialValue = 'test'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(localStorageMock.getItem).toHaveBeenCalledWith('key')
		expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(initialValue))
	})

	it('initializes with value from localStorage', () => {
		const storedValue = 'stored'
		localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue))
		const initialValue = 'test'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(storedValue)
		expect(localStorageMock.getItem).toHaveBeenCalledWith('key')
		expect(localStorageMock.setItem).not.toHaveBeenCalled()
	})

	it('sets new value and updates localStorage', () => {
		const initialValue = 'test'
		const newValue = 'updated'
		const { result } = renderHook(() => useLS('key', initialValue))

		act(() => {
			result.current[1](newValue)
		})

		expect(result.current[0]).toBe(newValue)
		expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(newValue))
	})

	it('deletes value from localStorage and resets to initialValue', () => {
		const initialValue = 'test'
		const storedValue = 'stored'
		localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue))
		const { result } = renderHook(() => useLS('key', initialValue))

		act(() => {
			result.current[2]()
		})

		expect(result.current[0]).toBe(initialValue)
		expect(localStorageMock.removeItem).toHaveBeenCalledWith('key')
	})

	it('handles complex data types', () => {
		const initialValue = { name: 'John', age: 30 }
		const storedValue = { name: 'Jane', age: 25 }
		localStorageMock.getItem.mockReturnValue(JSON.stringify(storedValue))
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toEqual(storedValue)

		const newValue = { name: 'Bob', age: 40 }
		act(() => {
			result.current[1](newValue)
		})

		expect(result.current[0]).toEqual(newValue)
		expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(newValue))
	})

	it('handles errors gracefully', () => {
		localStorageMock.getItem.mockImplementation(() => {
			throw new Error('Storage error')
		})

		const { result } = renderHook(() => useLS('key', 'test'))

		expect(result.current[0]).toBe('test')
		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error))
	})

	it('works when window is undefined', () => {
		vi.spyOn(window, 'localStorage', 'get').mockReturnValue(undefined as unknown as Storage)
		const initialValue = 'test'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(localStorageMock.getItem).not.toHaveBeenCalled()
		expect(localStorageMock.setItem).not.toHaveBeenCalled()

		act(() => {
			result.current[1]('updated')
		})

		expect(result.current[0]).toBe('updated')
		expect(localStorageMock.setItem).not.toHaveBeenCalled()
	})

	it('updates initialValueRef when initialValue changes', () => {
		const initialValue = 'initial'
		const { result, rerender } = renderHook(({ value }) => useLS('key', value), {
			initialProps: { value: initialValue }
		})

		expect(result.current[0]).toBe(initialValue)

		const newInitialValue = 'new-initial'
		rerender({ value: newInitialValue })

		act(() => {
			result.current[2]()
		})

		expect(result.current[0]).toBe(newInitialValue)
		expect(localStorageMock.removeItem).toHaveBeenCalledWith('key')
	})

	it('uses initialValue when localStorage.getItem returns null', () => {
		localStorageMock.getItem.mockReturnValue(null)
		const initialValue = 'test'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(localStorageMock.getItem).toHaveBeenCalledWith('key')
		expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(initialValue))
	})

	it('handles null value from localStorage correctly', () => {
		localStorageMock.getItem.mockReturnValue('null')

		const initialValue = 'default'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(null)
		expect(localStorageMock.getItem).toHaveBeenCalledWith('key')
		expect(localStorageMock.setItem).not.toHaveBeenCalled()
	})

	it('handles invalid JSON in localStorage', () => {
		localStorageMock.getItem.mockReturnValue('invalid json')

		const initialValue = 'default'
		const { result } = renderHook(() => useLS('key', initialValue))

		expect(result.current[0]).toBe(initialValue)
		expect(consoleErrorSpy).toHaveBeenCalled()
	})

	it('handles errors during delete operation gracefully', () => {
		localStorageMock.removeItem.mockImplementation(() => {
			throw new Error('Delete error')
		})

		const initialValue = 'test'
		const { result } = renderHook(() => useLS('key', initialValue))

		act(() => {
			result.current[2]()
		})

		expect(result.current[0]).toBe(initialValue)
		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error))
		expect(localStorageMock.removeItem).toHaveBeenCalledWith('key')
	})
})
