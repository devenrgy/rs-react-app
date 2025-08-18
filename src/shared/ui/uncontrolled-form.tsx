export const UncontrolledForm = () => {
	return (
		<form>
			<fieldset className='flex flex-col gap-3'>
				<legend className='mb-2'>Uncontrolled Form</legend>

				<p>
					<input className='w-full rounded-md border border-neutral-700 px-4 py-2' type='text' placeholder='Name' />
				</p>
				<p>
					<input
						className='no-spinner w-full rounded-md border border-neutral-700 px-4 py-2'
						type='number'
						inputMode='numeric'
						placeholder='Age'
					/>
				</p>
				<p>
					<input className='w-full rounded-md border border-neutral-700 px-4 py-2' type='email' placeholder='Email' />
				</p>
				<p>
					<input
						className='w-full rounded-md border border-neutral-700 px-4 py-2'
						type='password'
						placeholder='Password'
					/>
				</p>
				<p>
					<input
						className='w-full rounded-md border border-neutral-700 px-4 py-2'
						type='password'
						placeholder='Confirm Password'
					/>
				</p>
				<div className='flex gap-2'>
					<p className='flex items-center gap-2'>
						<label htmlFor='male'>Male</label>
						<input type='radio' id='male' name='gender' value='male' />
					</p>
					<p className='flex items-center gap-2'>
						<label htmlFor='female'>Female</label>
						<input type='radio' id='female' name='gender' value='female' />
					</p>
				</div>

				<p className='flex items-center gap-2'>
					<label htmlFor='terms'>Agree to terms</label>
					<input id='terms' type='checkbox' />
				</p>

				<p className='flex w-full items-center gap-5'>
					<label className='shrink-0' htmlFor='avatar'>
						Upload avatar
					</label>
					<input id='avatar' type='file' />
				</p>
			</fieldset>
		</form>
	)
}
