import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

import { Button } from '..'

interface ModalProps {
	children: React.ReactNode
	id: string
	container?: HTMLElement
	ref?: React.Ref<HTMLDialogElement>
}

export const Modal = ({ children, id, container = document.body, ref }: ModalProps) => {
	return createPortal(
		<dialog
			id={id}
			popover='auto'
			className='-translate-1/2 starting:backdrop:opacity-0 starting:opacity-0 starting:scale-0 inset-1/2 overflow-clip rounded-xl duration-500 backdrop:bg-black/50 backdrop:duration-500'
			ref={ref}
		>
			<div className='w-md bg-neutral-900 p-10'>
				{children}

				<Button
					className='absolute right-2 top-2'
					size='icon'
					color='transparent'
					aria-label='Close modal'
					autoFocus
					popoverTarget={id}
				>
					<X />
				</Button>
			</div>
		</dialog>,
		container
	)
}
