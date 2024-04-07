import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, setUser } from '../slices/app.slice'

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8000/api/v1/OnlineLS',
		headers: {
			Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
			'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
		},
	}),
	endpoints: (builder) => ({
		refreshToken: builder.query({
			query: (data) => ({
				url: 'user/refresh',
				method: 'GET',
				credentials: 'include',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					dispatch(
						setToken({
							token: data.metaData?.accessToken,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		loadUser: builder.query({
			query: (data) => ({
				url: '/user/me',
				method: 'GET',
				credentials: 'include',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					dispatch(
						setUser({
							user: data.metaData.userInfo,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})

export const { useLoadUserQuery } = appApi
