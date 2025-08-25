import { tv } from 'tailwind-variants'

import { cn } from '../lib'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'icon'
	color?: 'base' | 'transparent'
}

const button = tv({
	base: 'cursor-pointer text-sm rounded-md capitalize transition-colors duration-200',
	variants: {
		color: {
			base: 'bg-neutral-800 hover:bg-neutral-700',
			transparent: 'bg-transparent hover:bg-neutral-700'
		},
		size: {
			sm: 'px-4 py-2',
			md: 'px-5 py-3',
			lg: 'px-6 py-4',
			icon: 'p-2'
		}
	},
	defaultVariants: {
		color: 'base',
		size: 'md'
	}
})

export const Button = ({ children, size, color, type = 'button', className, ...props }: ButtonProps) => {
	return (
		<button className={cn(button({ size, color }), className)} type={type} {...props}>
			{children}
		</button>
	)
}
