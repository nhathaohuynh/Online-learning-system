import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import appSlice from './slices/app.slice'

export const store = configureStore({
	reducer: {
		app: appSlice,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware)
})
