export const FORM_USE_CASES = ['uncontrolled', 'controlled'] as const

export type FormUseCase = (typeof FORM_USE_CASES)[number]
