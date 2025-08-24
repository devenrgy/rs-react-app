import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useRef } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button, Checkbox, cn, Input, RadioGroup, RadioGroupItem } from '@/shared'

import { convertToBase64, type CustomFormData, formSchema, getPasswordStrength, strengthText, useCountries } from '..'

interface UncontrolledFormProps {
	onClose: () => void
	onSubmit: (action: CustomFormData & { isSending: boolean }) => void
	sendFormAction: (form: Omit<CustomFormData, 'isSending'>) => Promise<void>
}

type Data = z.infer<typeof formSchema>

export const ControlledForm = ({ onSubmit, sendFormAction, onClose }: UncontrolledFormProps) => {
	const countries = useCountries()
	const { register, handleSubmit, formState, watch } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema)
	})
	const formRef = useRef<HTMLFormElement>(null)

	const onSubmitForm = async (data: Data) => {
		const avatarBase64 = await convertToBase64(data.avatar)

		startTransition(async () => {
			onSubmit({ ...data, age: Number(data.age), isSending: true, avatar: avatarBase64 })
			await sendFormAction({ ...data, age: Number(data.age), avatar: avatarBase64 })
		})
		formRef.current?.reset()
		onClose()
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit(onSubmitForm)}>
			<fieldset className='flex flex-col gap-1'>
				<legend className='mb-2'>Controlled Form</legend>
				<Input label='Avatar' {...register('avatar')} name='avatar' placeholder='Avatar' type='file' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.avatar?.message}</p>
				<Input label='Name' {...register('name')} name='name' placeholder='Name' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.name?.message}</p>
				<Input label='Age' {...register('age')} name='age' placeholder='Age' inputMode='numeric' type='number' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.age?.message}</p>
				<Input label='Email' {...register('email')} name='email' placeholder='Email' type='email' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.email?.message}</p>
				<Input label='Password' {...register('password')} name='password' placeholder='Password' type='password' />{' '}
				<p className='h-5 text-sm text-red-400'>{formState.errors?.password?.message}</p>
				<p
					className={cn(
						'mt-1 h-5 text-sm',
						strengthText(watch('password')) === 'Weak' && 'text-red-400',
						strengthText(watch('password')) === 'Medium' && 'text-yellow-400',
						strengthText(watch('password')) === 'Strong' && 'text-green-400'
					)}
				>
					Password Strength: {strengthText(watch('password'))}
				</p>
				<div
					className={cn(
						'mt-1 h-2 rounded-full',
						getPasswordStrength(watch('password')) === 'weak' && 'bg-red-400',
						getPasswordStrength(watch('password')) === 'medium' && 'bg-yellow-400',
						getPasswordStrength(watch('password')) === 'strong' && 'bg-green-400',
						!watch('password') && 'bg-gray-200'
					)}
					style={{ width: `${Math.min(((watch('password')?.length ?? 0) / 16) * 100, 100)}%` }}
				/>
				<Input
					label='Confirm Password'
					{...register('confirmPassword')}
					name='confirmPassword'
					placeholder='Confirm Password'
					type='password'
				/>
				<p className='h-5 text-sm text-red-400'>{formState.errors?.confirmPassword?.message}</p>
				<Input label='Country' {...register('country')} placeholder='Country' list='countries' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.country?.message}</p>
				<datalist id='countries'>
					{countries.map(country => (
						<option key={country} value={country} />
					))}
				</datalist>
				<RadioGroup className='flex gap-2' name='gender'>
					{name => (
						<>
							<RadioGroupItem label='male' {...register('gender')} className='size-4' name={name} value='male' />
							<RadioGroupItem label='female' {...register('gender')} className='size-4' name={name} value='female' />
						</>
					)}
				</RadioGroup>
				<p className='h-5 text-sm text-red-400'>{formState.errors?.gender?.message}</p>
				<Checkbox label='Agree to terms' {...register('terms')} name='terms' className='size-4' />
				<p className='h-5 text-sm text-red-400'>{formState.errors?.terms?.message}</p>
				<Button
					className='disabled:cursor-not-allowed disabled:opacity-50'
					type='submit'
					disabled={!formState.isValid || formState.isSubmitting}
				>
					Submit
				</Button>
			</fieldset>
		</form>
	)
}
