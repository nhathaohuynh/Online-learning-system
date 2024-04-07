import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
	name: 'app',
	initialState: {
		token: null,
		user: null,
	},
	reducers: {
		userRegistration: (state, action) => {
			state.token = action.payload.token
		},
		userLoggedIn: (state, action) => {
			state.token = action.payload.token
			state.user = action.payload.user
		},
		userLoggedOut: (state) => {
			state.token = ''
			state.user = ''
		},
		setUser: (state, action) => {
			state.user = action.payload.user
		},

		setToken: (state, action) => {
			state.token = action.payload.token
		},
	},
})

export const {
	userLoggedIn,
	userLoggedOut,
	userRegistration,
	setToken,
	setUser,
} = appSlice.actions

export default appSlice.reducer
