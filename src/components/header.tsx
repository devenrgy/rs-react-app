export const Header = ({ handleUpdateForm }: { handleUpdateForm: (form: 'uncontrolled' | 'controlled') => void }) => {
	return (
		<header className='container flex justify-between py-10 text-sm'>
			<nav>
				<ul className='flex gap-5'>
					<li>
						<button
							onClick={() => handleUpdateForm('uncontrolled')}
							className='cursor-pointer rounded-md border border-neutral-700 px-2 py-4'
						>
							Uncontrolled Form
						</button>
					</li>
					<li>
						<button
							onClick={() => handleUpdateForm('controlled')}
							className='cursor-pointer rounded-md border border-neutral-700 px-2 py-4'
						>
							Controlled Form
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}
