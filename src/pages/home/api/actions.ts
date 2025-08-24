import { type CustomFormData } from '..'

export async function deliverForm(form: CustomFormData) {
	await new Promise(res => setTimeout(res, 1000))
	return form
}
