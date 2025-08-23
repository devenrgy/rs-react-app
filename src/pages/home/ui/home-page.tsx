import { Button, Header, Modal, Navigation, NavigationItem } from '@/shared'
import { WithState } from '@/shared/lib'

import { FORM_USE_CASES, type FormUseCase } from '..'
import { ControlledForm } from './controlled-form'
import { UncontrolledForm } from './uncontrolled-form'

export const HomePage = () => (
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
				<Modal id={formUseCase}>{formUseCase === 'uncontrolled' ? <UncontrolledForm /> : <ControlledForm />}</Modal>
			</Header>
		)}
	</WithState>
)
