import { cn } from '..'

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('animate-pulse rounded-md bg-accent', className)} {...props} />
}

export { Skeleton }
