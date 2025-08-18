import { Button, ControlledForm, Header, Modal, Navigation, NavigationItem, UncontrolledForm } from '@/shared'
import { WithState } from '@/shared/lib'

import { FORM_USE_CASES, type FormUseCase } from '..'

export const HomePage = () => (
	<WithState<FormUseCase> initialState={'uncontrolled'}>
		{(formUseCase, setFormUseCase) => (
			<Header>
				<Navigation items={FORM_USE_CASES}>
					{item => (
						<NavigationItem key={item}>
							<Button data={item} popoverTarget={item} onClick={setFormUseCase} />
						</NavigationItem>
					)}
				</Navigation>
				<Modal id={formUseCase}>{formUseCase === 'uncontrolled' ? <UncontrolledForm /> : <ControlledForm />}</Modal>
			</Header>
		)}
	</WithState>
)
