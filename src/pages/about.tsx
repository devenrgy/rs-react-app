import { Link } from 'react-router'

export const About = () => {
	return (
		<main className='grid min-h-dvh pb-20 pt-40'>
			<section className='container text-lg'>
				<h1 className='mb-10 text-balance text-4xl font-bold capitalize'>About</h1>
				<p className='mb-5'>
					Hi! My name is Alex and I went crazy at <span className='dark:text-gold'>Rolling Scopes School</span>
				</p>
				<p className='mb-5'>
					This project is part of the{' '}
					<Link
						className='dark:text-rose text-love underline-offset-5 hover:underline'
						to='https://rs.school/courses/reactjs'
						target='_blank'
						rel='noopener noreferrer'
					>
						RS School React course
					</Link>
				</p>

				<Link
					to='https://github.com/devenrgy'
					target='_blank'
					rel='noopener noreferrer'
					className='dark:text-iris text-pine underline-offset-5 hover:underline'
				>
					My Github
				</Link>
			</section>
		</main>
	)
}
