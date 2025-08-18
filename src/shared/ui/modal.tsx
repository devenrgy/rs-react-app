import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ModalProps {
	children: React.ReactNode
	id: string
	container?: HTMLElement
}

export const Modal = ({ children, id, container = document.body }: ModalProps) => {
	return createPortal(
		<dialog id={id} popover='auto' className='-translate-1/2 inset-1/2 overflow-clip rounded-xl backdrop:bg-black/50'>
			<div className='w-md bg-neutral-900 p-10'>
				{children}

				<button
					popoverTarget={id}
					autoFocus
					type='button'
					aria-label='Close modal'
					className='absolute right-2 top-2 cursor-pointer p-2'
				>
					<X />
				</button>
			</div>
		</dialog>,
		container
	)
}
