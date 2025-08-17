import { X } from 'lucide-react'
import { type MouseEvent, type ReactNode, type Ref } from 'react'

export const Modal = ({
	children,
	ref,
	onClose
}: {
	children: ReactNode
	ref: Ref<HTMLDialogElement>
	onClose: () => void
}) => {
	const handleClickOutside = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<dialog ref={ref} onClick={handleClickOutside} className='-translate-1/2 inset-1/2 rounded-xl backdrop:bg-black/50'>
			<div className='w-xl bg-neutral-900 p-10'>
				{children}

				<button autoFocus type='button' className='absolute right-2 top-2 cursor-pointer p-2' onClick={onClose}>
					<X />
				</button>
			</div>
		</dialog>
	)
}
