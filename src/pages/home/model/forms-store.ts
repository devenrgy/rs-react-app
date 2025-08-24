import { create, type StateCreator } from 'zustand'

export type CustomFormData = {
	name: string
	age: number
	email: string
	avatar: Base64URLString
	gender: string
	country: string
	isSending: boolean
}

type FormState = {
	forms: CustomFormData[]
	actions: {
		addForm: (form: Omit<CustomFormData, 'isSending'>) => void
	}
}

const store: StateCreator<FormState> = set => ({
	forms: [],
	actions: {
		addForm(form: Omit<CustomFormData, 'isSending'>) {
			set(state => ({
				forms: [{ ...form, isSending: false }, ...state.forms]
			}))
		}
	}
})

const useFormsStore = create(store)

export const useForms = () => useFormsStore(state => state.forms)
export const useFormsActions = () => useFormsStore(state => state.actions)
