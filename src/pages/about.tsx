import { Link } from 'react-router'

export const About = () => {
	return (
		<main className='grid min-h-dvh pt-40 pb-20'>
			<section className='container text-lg'>
				<h1 className='mb-10 text-4xl font-bold text-balance capitalize'>About</h1>
				<p className='mb-5'>
					Hi! My name is Alex and I went crazy at <span className='text-gold'>Rolling Scopes School</span>
				</p>
				<p className='mb-5'>
					This project is part of the{' '}
					<Link className='text-rose' to='https://rs.school/courses/reactjs' target='_blank' rel='noopener noreferrer'>
						RS School React course
					</Link>
				</p>

				<Link to='https://github.com/devenrgy' target='_blank' rel='noopener noreferrer' className='text-iris'>
					My Github
				</Link>
			</section>
		</main>
	)
}
