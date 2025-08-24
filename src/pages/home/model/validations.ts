import z from 'zod'

import { assertIsNonNullable } from '@/shared/lib/assert-is-non-nullable'

export const formSchema = z
	.object({
		name: z.string().regex(/^[A-Z]/, 'Name must start with a capital letter'),
		age: z.string().refine(data => Number(data) > 0, { message: 'Age must be greater than 0' }),
		email: z.email(),
		avatar: z
			.custom<FileList | File>()
			.refine(value => (value instanceof FileList ? value.length > 0 : value), {
				error: 'Image is required'
			})
			.transform(value => {
				if (value instanceof FileList) {
					const value_ = value.item(0)

					assertIsNonNullable(value_, 'Validation error')

					return value_
				}
				if (value instanceof File) {
					return value
				}

				throw new Error('expected file type')
			})
			.refine(file => {
				const fileName = file.name.toLowerCase()
				const fileExtension = fileName.split('.')
				return fileExtension.includes('png') || fileExtension.includes('jpeg')
			}, 'Avatar must be an image (png or jpeg)')
			.refine(file => file && file.size <= 5 * 1024 * 1024, {
				error: 'Max image size is 5MB'
			}),
		password: z.string().nonempty('Password is required'),
		confirmPassword: z.string().nonempty('Confirm password is required'),
		gender: z.string('Gender is required').nonempty('Gender is required'),
		country: z.string().nonempty('Country is required'),
		terms: z.boolean().refine(value => value === true, { error: 'You must accept the terms' })
	})
	.refine(data => data.password === data.confirmPassword, {
		error: 'Passwords do not match',
		path: ['confirmPassword']
	})
