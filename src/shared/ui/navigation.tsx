interface NavigationProps<T extends string> {
	items: readonly T[]
	children: (item: T) => React.ReactNode
}

export const Navigation = <T extends string>({ children, items }: NavigationProps<T>) => {
	return (
		<nav>
			<ul className='flex gap-4'>{items.map(children)}</ul>
		</nav>
	)
}

interface NavigationItemProps {
	children: React.ReactNode
}

export const NavigationItem = ({ children }: NavigationItemProps) => <li>{children}</li>
