export const getPasswordStrength = (password: string | undefined) => {
	if (!password) return 'weak'

	const length = password.length
	const hasNumber = /\d/.test(password)
	const hasUpperCase = /[A-Z]/.test(password)
	const hasLowerCase = /[a-z]/.test(password)
	const hasSpecialChar = /[@$!%*?&]/.test(password)

	const hasAllRequired = hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar

	if (length >= 12 && hasAllRequired) return 'strong'
	if (length >= 8 && hasAllRequired) return 'medium'
	return 'weak'
}

export const strengthText = (password: string | undefined) =>
	getPasswordStrength(password).replace('weak', 'Weak').replace('medium', 'Medium').replace('strong', 'Strong')
