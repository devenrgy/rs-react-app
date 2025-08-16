import type { ReactNode } from 'react'

export const HeaderLeftGroup = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex items-center gap-10'>
			{children}
		</div>
	)
}

export const HeaderRightGroup = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex items-center gap-3'>
			{children}
		</div>
	)
}

export const Header = ({ children }: { children: ReactNode }) => {
	return (
		<header className='@container fixed z-30 inset-x-0 py-4 px-8 backdrop-blur-3xl'>
			<div className='flex justify-between items-center w-full gap-10'>
				{children}
			</div>
		</header>
	)
}
