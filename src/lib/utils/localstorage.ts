export const setLocalStorage = <T>(key: string, value: T) => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error('LocalStorage save error:', error)
	}
}

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
	try {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : defaultValue
	} catch (error) {
		console.error('LocalStorage read error:', error)
		return defaultValue
	}
}

export const removeLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error('LocalStorage remove error:', error)
	}
}
