import type { ReactNode } from 'react'

export const BaseLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return <div className='py-40'>{children}</div>
}
