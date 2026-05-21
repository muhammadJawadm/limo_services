import { create } from 'zustand'

const initialState = {
	currentBookingTab: 'upcoming',
}

export const useUserStore = create((set) => ({
	...initialState,

	setCurrentBookingTab: (tab) => {
		set({ currentBookingTab: tab })
	},
}))
