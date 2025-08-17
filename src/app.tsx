import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { ControlledForm } from '@/components/controlled-form'
import { Header } from '@/components/header'
import { Modal } from '@/components/modal'
import { UncontrolledForm } from '@/components/uncontrolled-form'

export const App = () => {
	const [currentForm, setCurrentForm] = useState<'controlled' | 'uncontrolled'>('uncontrolled')
	const ref = useRef<HTMLDialogElement>(null)

	const renderForm = () => {
		return currentForm === 'uncontrolled' ? <UncontrolledForm /> : <ControlledForm />
	}

	const handleUpdateForm = (form: 'uncontrolled' | 'controlled') => {
		setCurrentForm(form)
		ref.current?.showModal()
	}

	return (
		<>
			<Header handleUpdateForm={handleUpdateForm} />
			{createPortal(
				<Modal ref={ref} onClose={() => ref.current?.close()}>
					{renderForm()}
				</Modal>,
				document.body
			)}
		</>
	)
}
