export const convertToBase64 = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()

		reader.addEventListener('load', () => {
			resolve(String(reader.result))
		})

		reader.addEventListener('error', () => {
			reject(new Error('Failed to read file'))
		})

		reader.readAsDataURL(file)
	})
}
