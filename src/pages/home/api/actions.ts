import { type FormData } from '..'

export async function deliverForm(form: FormData) {
	await new Promise(res => setTimeout(res, 1000))
	return form
}
