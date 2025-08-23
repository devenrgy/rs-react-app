import { User } from 'lucide-react'

import { Avatar, Checkbox, cn, Input, RadioGroup, RadioGroupItem } from '@/shared'

export const UncontrolledForm = () => {
	const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<fieldset className='flex flex-col gap-4'>
				<legend className='mb-2'>Uncontrolled Form</legend>

				<fieldset className='flex items-center justify-between gap-5'>
					<div className='flex grow flex-col gap-4'>
						<div className='grid grid-cols-[auto_1fr] gap-4'>
							<Input name='name' placeholder='Name' />
							<Input name='age' placeholder='Age' inputMode='numeric' type='number' />
						</div>
						<Input name='email' placeholder='Email' type='email' />
					</div>
					<Avatar className='size-20 shrink-0'>
						<Input
							label={<User />}
							labelClassName={cn(
								'grid place-content-center bg-neutral-800 size-full',
								'transition-colors duration-200 hover:bg-neutral-700',
								'cursor-pointer'
							)}
							className='hidden'
							name='avatar'
							type='file'
						/>
					</Avatar>
				</fieldset>
				<Input name='password' placeholder='Password' type='password' />
				<Input name='confirmPassword' placeholder='Confirm Password' type='password' />
				<RadioGroup className='flex gap-2' name='gender'>
					{name => (
						<>
							<RadioGroupItem className='size-4' name={name} value='male' />
							<RadioGroupItem className='size-4' name={name} value='female' />
						</>
					)}
				</RadioGroup>
				<Checkbox className='size-4' label='Agree to terms' />
			</fieldset>
		</form>
	)
}
