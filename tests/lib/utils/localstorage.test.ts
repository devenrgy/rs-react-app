import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/lib/utils/localstorage'

describe('localstorage', () => {
	const mockLocalStorage = (() => {
		const store = new Map<string, string>()

		return {
			getItem: vi.fn((key: string) => store.get(key) ?? null),
			setItem: vi.fn((key: string, value: string) => {
				store.set(key, value.toString())
			}),
			removeItem: vi.fn((key: string) => {
				store.delete(key)
			}),
			clear: vi.fn(() => {
				store.clear()
			})
		}
	})()

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.stubGlobal('localStorage', mockLocalStorage)
		mockLocalStorage.clear()
		vi.clearAllMocks()
	})

	describe('setLocalStorage', () => {
		it('should set value in localStorage', () => {
			const key = 'testKey'
			const value = { data: 'testValue' }

			setLocalStorage(key, value)

			expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
		})

		it('should not throw when setting invalid value', () => {
			const key = 'testKey'
			const circularReference: Record<string, unknown> = { data: 'test' }
			circularReference.myself = circularReference

			const consoleSpy = vi.spyOn(console, 'error')

			expect(() => setLocalStorage(key, circularReference)).not.toThrow()
			expect(consoleSpy).toHaveBeenCalledWith('LocalStorage save error:', expect.any(Error))
		})
	})

	describe('getLocalStorage', () => {
		it('should return default value for non-existent keys', () => {
			const defaultValue = { default: 'value' }
			expect(getLocalStorage('non-existent', defaultValue)).toEqual(defaultValue)
		})

		it('should return parsed value for existing keys', () => {
			const key = 'testKey'
			const value = { data: 'testValue' }
			const defaultValue = { default: 'value' }
			localStorage.setItem(key, JSON.stringify(value))

			expect(getLocalStorage(key, defaultValue)).toEqual(value)
		})

		it('should return default value for invalid JSON', () => {
			const key = 'testKey'
			const defaultValue = { default: 'value' }
			localStorage.setItem(key, 'invalid json')

			const consoleSpy = vi.spyOn(console, 'error')

			expect(getLocalStorage(key, defaultValue)).toEqual(defaultValue)
			expect(consoleSpy).toHaveBeenCalledWith('LocalStorage read error:', expect.any(Error))
		})
	})

	describe('removeLocalStorage', () => {
		it('should remove item from localStorage', () => {
			const key = 'testKey'
			localStorage.setItem(key, 'testValue')

			removeLocalStorage(key)

			expect(localStorage.removeItem).toHaveBeenCalledWith(key)
		})

		it('should not throw when removing non-existent key', () => {
			const consoleSpy = vi.spyOn(console, 'error')

			expect(() => removeLocalStorage('non-existent')).not.toThrow()
			expect(consoleSpy).not.toHaveBeenCalled()
		})

		it('should log error when removal fails', () => {
			const key = 'testKey'
			localStorage.setItem(key, 'testValue')

			vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {
				throw new Error('Mock removal error')
			})

			const consoleSpy = vi.spyOn(console, 'error')

			expect(() => removeLocalStorage(key)).not.toThrow()
			expect(consoleSpy).toHaveBeenCalledWith('LocalStorage remove error:', expect.any(Error))
		})
	})
})
