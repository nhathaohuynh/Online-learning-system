import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
	name: 'course',
	initialState: {
		courses: null,
		invoices: null,
		users: null,
	},
	reducers: {
		setCourse: (state, action) => {
			state.courses = action.payload.course
		},

		setInvoices: (state, action) => {
			state.invoices = action.payload.invoices
		},

		setUsers: (state, action) => {
			state.users = action.payload.users
		},
	},
})

export const { setCourse, setInvoices, setUsers } = adminSlice.actions

export default adminSlice.reducer
