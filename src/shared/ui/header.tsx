interface HeaderProps {
	children: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
	return <header className='container flex justify-between py-10 text-sm'>{children}</header>
}
