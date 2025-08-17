import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
	items: []
	actions: {
		test: () => void
	}
}

const store: StateCreator<State> = (set, get) => ({
	items: [],
	actions: {
		test: () => {}
	}
})

const useStore = create(
	persist(store, {
		name: 'rs-forms',
		partialize: ({ items }) => ({ items })
	})
)

export const useItems = () => useStore(state => state.items)
export const useItemsActions = () => useStore(state => state.actions)
