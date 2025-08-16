import { cn } from '../lib/cn'

type Props = {
	title: string
	href: string
	className?: string
}

export const ExternalLink = ({ href, title, className }: Props) => {
	return (
		<a
			className={cn('underline-offset-5 hover:underline', className)}
			href={href}
			rel='noreferrer'
			target='_blank'
		>
			<p className='text-primary'>
				{title}
			</p>
		</a>
	)
}
