import { startTransition, useOptimistic, useRef, useState } from 'react'

import { Button, cn, Header, Modal, Navigation, NavigationItem, WithState } from '@/shared'

import { type CustomFormData, deliverForm, FORM_USE_CASES, type FormUseCase, useForms, useFormsActions } from '..'
import { ControlledForm } from './controlled-form'
import { UncontrolledForm } from './uncontrolled-form'

export const HomePage = () => {
	const initialForms = useForms()
	const { addForm } = useFormsActions()
	const [forms, setForms] = useState(initialForms)
	const [optimisticForms, addOptimisticForm] = useOptimistic<CustomFormData[], CustomFormData & { isSending: boolean }>(
		forms,
		(state, newForm) => [{ ...newForm, isSending: true }, ...state]
	)
	const modalRef = useRef<HTMLDialogElement>(null)

	const sendFormAction = async (form: Omit<CustomFormData, 'isSending'>) => {
		addForm(form)
		const sentForm = await deliverForm(form)
		startTransition(() => {
			setForms(forms => [sentForm, ...forms])
		})
	}

	const onCloseModal = () => {
		modalRef.current?.hidePopover()
	}

	return (
		<>
			<WithState<FormUseCase> initialState={'uncontrolled'}>
				{(formUseCase, setFormUseCase) => (
					<Header>
						<Navigation items={FORM_USE_CASES}>
							{item => (
								<NavigationItem key={item}>
									<Button popoverTarget={item} onClick={() => setFormUseCase(item)}>
										{item}
									</Button>
								</NavigationItem>
							)}
						</Navigation>
						<Modal id={formUseCase} ref={modalRef}>
							{formUseCase === 'uncontrolled' ? (
								<UncontrolledForm onClose={onCloseModal} onSubmit={addOptimisticForm} sendFormAction={sendFormAction} />
							) : (
								<ControlledForm onClose={onCloseModal} onSubmit={addOptimisticForm} sendFormAction={sendFormAction} />
							)}
						</Modal>
					</Header>
				)}
			</WithState>

			<main>
				<section className='container'>
					<h1 className='mb-4 text-4xl font-medium'>Forms</h1>

					{optimisticForms.map((form, index) => (
						<div className={cn('mb-4', { 'animate-pulse bg-white/20': form.isSending })} key={index}>
							<p>{form.name}</p>
							<p>{form.age}</p>
							<p>{form.email}</p>
							<p>{form.gender}</p>
							<p>{form.country}</p>
						</div>
					))}
				</section>
			</main>
		</>
	)
}
