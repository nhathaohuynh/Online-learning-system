import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appApi } from './queries/app.api'
import appSlice from './slices/app.slice'

export const store = configureStore({
	reducer: {
		[appApi.reducerPath]: appApi.reducer,
		app: appSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(appApi.middleware),
})

const initializeApp = async () => {
	await store.dispatch(
		appApi.endpoints.refreshToken.initiate({}, { forceRefetch: true }),
	)

	await store.dispatch(
		appApi.endpoints.loadUser.initiate({}, { forceRefetch: true }),
	)
}

initializeApp()

// setupListeners(store.dispatch)
