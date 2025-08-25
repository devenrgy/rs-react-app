import { getPasswordStrength, strengthText } from './password'

describe('getPasswordStrength', () => {
	it('should return "weak" for undefined or empty password', () => {
		expect(getPasswordStrength(undefined)).toBe('weak')
		expect(getPasswordStrength('')).toBe('weak')
	})

	it('should return "weak" for passwords shorter than 8 characters', () => {
		expect(getPasswordStrength('Ab1@')).toBe('weak')
		expect(getPasswordStrength('abc123')).toBe('weak')
	})

	it('should return "weak" if not all required character types are present', () => {
		expect(getPasswordStrength('abcdefghijk')).toBe('weak')
		expect(getPasswordStrength('ABCDEFGHIJK')).toBe('weak')
		expect(getPasswordStrength('abc12345678')).toBe('weak')
		expect(getPasswordStrength('abcABC123456')).toBe('weak')
	})

	it('should return "medium" for passwords >= 8 characters with all required character types', () => {
		expect(getPasswordStrength('Abcd1234@')).toBe('medium')
		expect(getPasswordStrength('Test123!abc')).toBe('medium')
	})

	it('should return "strong" for passwords >= 12 characters with all required character types', () => {
		expect(getPasswordStrength('Abcd1234@xyz!')).toBe('strong')
		expect(getPasswordStrength('Test123!abcdEF')).toBe('strong')
	})
})

describe('strengthText', () => {
	it('should capitalize the strength text', () => {
		expect(strengthText(undefined)).toBe('Weak')
		expect(strengthText('Abcd1234@')).toBe('Medium')
		expect(strengthText('Abcd1234@xyz!')).toBe('Strong')
	})

	it('should handle same cases as getPasswordStrength', () => {
		expect(strengthText('')).toBe('Weak')
		expect(strengthText('Ab1@')).toBe('Weak')
		expect(strengthText('abcdefghijk')).toBe('Weak')
		expect(strengthText('Abcd1234@')).toBe('Medium')
		expect(strengthText('Abcd1234@xyz!')).toBe('Strong')
	})
})
