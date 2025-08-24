import { startTransition, useActionState, useState } from 'react'
import z from 'zod'

import { Button, Checkbox, cn, Input, RadioGroup, RadioGroupItem } from '@/shared'

import { convertToBase64, type CustomFormData, formSchema, getPasswordStrength, strengthText, useCountries } from '..'

interface UncontrolledFormProps {
	onClose: () => void
	onSubmit: (action: CustomFormData & { isSending: boolean }) => void
	sendFormAction: (form: Omit<CustomFormData, 'isSending'>) => Promise<void>
}

export const UncontrolledForm = ({ onSubmit, sendFormAction, onClose }: UncontrolledFormProps) => {
	const countries = useCountries()
	const [errors, setErrors] = useState<Partial<
		Record<keyof CustomFormData | 'terms' | 'confirmPassword' | 'password', string[]>
	> | null>(null)

	const formAction = async (_: unknown, formData: FormData) => {
		const { avatar, ...rawDataWithoutAvatar } = {
			name: formData.get('name') as string,
			age: formData.get('age') as string,
			email: formData.get('email') as string,
			avatar: formData.get('avatar') as File,
			gender: formData.get('gender') as string,
			country: formData.get('country') as string,
			password: formData.get('password') as string,
			confirmPassword: formData.get('confirmPassword') as string,
			terms: Boolean(formData.get('terms'))
		}

		const { data, success, error } = formSchema.safeParse({ avatar, ...rawDataWithoutAvatar })

		if (error) {
			setErrors(z.flattenError(error).fieldErrors)
			return rawDataWithoutAvatar
		}

		if (!success) {
			console.log('Create store form data error')
			return rawDataWithoutAvatar
		}

		const avatarBase64 = await convertToBase64(data.avatar)

		startTransition(async () => {
			onSubmit({ ...data, age: Number(data.age), isSending: true, avatar: avatarBase64 })
			await sendFormAction({ ...data, age: Number(data.age), avatar: avatarBase64 })
		})
		setErrors(null)
		onClose()
	}

	const [state, action] = useActionState(formAction, {
		name: '',
		age: '',
		email: '',
		password: '',
		confirmPassword: '',
		gender: '',
		country: '',
		terms: false
	})

	return (
		<form action={action}>
			<fieldset className='flex flex-col gap-1'>
				<legend className='mb-2'>Uncontrolled Form</legend>
				<Input label='Avatar' name='avatar' placeholder='Avatar' type='file' />
				<p className='h-5 text-sm text-red-400'>{errors?.avatar?.[0]}</p>
				<Input label='Name' name='name' placeholder='Name' defaultValue={state?.name} />
				<p className='h-5 text-sm text-red-400'>{errors?.name?.[0]}</p>
				<Input label='Age' name='age' placeholder='Age' inputMode='numeric' type='number' defaultValue={state?.age} />
				<p className='h-5 text-sm text-red-400'>{errors?.age?.[0]}</p>
				<Input label='Email' name='email' placeholder='Email' type='email' defaultValue={state?.email} />
				<p className='h-5 text-sm text-red-400'>{errors?.email?.[0]}</p>
				<Input label='Password' name='password' placeholder='Password' type='password' defaultValue={state?.password} />
				<p className='h-5 text-sm text-red-400'>{errors?.password?.[0]}</p>
				<p
					className={cn(
						'mt-1 h-5 text-sm',
						strengthText(state?.password) === 'Weak' && 'text-red-400',
						strengthText(state?.password) === 'Medium' && 'text-yellow-400',
						strengthText(state?.password) === 'Strong' && 'text-green-400'
					)}
				>
					Password Strength: {strengthText(state?.password)}
				</p>
				<div
					className={cn(
						'mt-1 h-2 rounded-full',
						getPasswordStrength(state?.password) === 'weak' && 'bg-red-400',
						getPasswordStrength(state?.password) === 'medium' && 'bg-yellow-400',
						getPasswordStrength(state?.password) === 'strong' && 'bg-green-400',
						!state?.password && 'bg-gray-200'
					)}
					style={{ width: `${Math.min(((state?.password?.length ?? 0) / 16) * 100, 100)}%` }}
				/>
				<Input
					label='Confirm Password'
					name='confirmPassword'
					placeholder='Confirm Password'
					type='password'
					defaultValue={state?.confirmPassword}
				/>
				<p className='h-5 text-sm text-red-400'>{errors?.confirmPassword?.[0]}</p>
				<Input label='Country' name='country' placeholder='Country' list='countries' defaultValue={state?.country} />
				<p className='h-5 text-sm text-red-400'>{errors?.country?.[0]}</p>
				<datalist id='countries'>
					{countries.map(country => (
						<option key={country} value={country} />
					))}
				</datalist>
				<RadioGroup className='flex gap-2' name='gender'>
					{name => (
						<>
							<RadioGroupItem
								label='Male'
								className='size-4'
								name={name}
								value='male'
								defaultChecked={state?.gender === 'male'}
							/>
							<RadioGroupItem
								label='Female'
								className='size-4'
								name={name}
								value='female'
								defaultChecked={state?.gender === 'female'}
							/>
						</>
					)}
				</RadioGroup>
				<p className='h-5 text-sm text-red-400'>{errors?.gender?.[0]}</p>
				<Checkbox name='terms' className='size-4' label='Agree to terms' defaultChecked={Boolean(state?.terms)} />
				<p className='h-5 text-sm text-red-400'>{errors?.terms?.[0]}</p>
				<Button type='submit'>Submit</Button>
			</fieldset>
		</form>
	)
}
