import { cn } from '../lib'

interface AvatarProps {
	className?: string
	children: React.ReactNode
}

interface AvatarFallbackProps {
	className?: string
}

const AvatarFallback = ({ className }: AvatarFallbackProps) => {
	return <div className={cn('flex size-full items-center justify-center rounded-full bg-neutral-800', className)} />
}

export const Avatar = ({ className, children }: AvatarProps) => {
	return (
		<div
			className={cn(
				'relative grid size-8 grid-cols-[1fr_auto] grid-rows-1 place-content-center overflow-hidden rounded-full',
				className
			)}
		>
			{children}
			<AvatarFallback />
		</div>
	)
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	className?: string
}

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
	return <img className={cn('aspect-square size-full w-full', className)} {...props}></img>
}
