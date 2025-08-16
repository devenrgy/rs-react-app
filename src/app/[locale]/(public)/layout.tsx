import type { ReactNode } from 'react'
import { Header, HeaderLeftGroup, HeaderRightGroup } from '@/shared/ui/header'
import { LocaleSwitcher } from '@/shared/ui/locale-switcher'
import { Logo } from '@/shared/ui/logo'
import { ModeToggle } from '@/shared/ui/mode-toggle'
import { Navigation } from '@/shared/ui/navigation'
import { SearchForm } from '@/shared/ui/search-form'

export default async function PublicLayout({ children, modal }: Readonly<{ children: ReactNode, modal: ReactNode }>) {
	return (
		<div className='relative overflow-clip'>
			<Header>
				<HeaderLeftGroup>
					<Logo />
					<Navigation />
				</HeaderLeftGroup>
				<HeaderRightGroup>
					<SearchForm />
					<ModeToggle />
					<LocaleSwitcher />
				</HeaderRightGroup>
			</Header>

			<main>{children}</main>

			{modal}
		</div>
	)
}
