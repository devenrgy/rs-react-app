import { useState } from 'react'

export function WithState<StateValue = undefined>({
	children,
	initialState
}: {
	initialState: StateValue | (() => StateValue)
	children: (state: StateValue, setState: React.Dispatch<React.SetStateAction<StateValue>>) => React.ReactNode
}) {
	const [state, setState] = useState<StateValue>(initialState)
	return children(state, setState)
}
