import { type CustomFormData } from '..'

export async function deliverForm(form: Omit<CustomFormData, 'isSending'>) {
	await new Promise(res => setTimeout(res, 1000))
	return form
}
