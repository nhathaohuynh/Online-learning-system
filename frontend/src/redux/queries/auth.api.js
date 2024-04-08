import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser, userLoggedIn, userRegistration } from '../slices/app.slice'
import { appApi } from './app.api'

export const authApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: '/user/login',
				method: 'POST',
				body,
				credentials: 'include',
			}),

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled

					window.localStorage.setItem(
						'_id',
						JSON.stringify(data.metaData?.user?._id),
					)

					window.localStorage.setItem(
						'token',
						JSON.stringify(data.metaData?.accessToken),
					)

					dispatch(
						userLoggedIn({
							token: data.metaData?.accessToken,
							user: data.metaData?.user,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		register: builder.mutation({
			query: (body) => ({
				url: '/user/register',
				method: 'POST',
				body,
				credentials: 'include',
			}),

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					dispatch(
						userRegistration({
							token: data.metaData?.data?.activationToken,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		verification: builder.mutation({
			query: (body) => ({
				url: '/user/activate-user',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),

		logout: builder.mutation({
			query: (body) => ({
				url: '/user/logout',
				method: 'DELETE',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					localStorage.removeItem('_id')
					localStorage.removeItem('token')
					dispatch(
						userLoggedIn({
							token: null,
							user: null,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),

		changePassword: builder.mutation({
			query: (body) => ({
				url: '/user/change-password',
				method: 'PUT',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
		}),

		updateProfile: builder.mutation({
			query: (body) => ({
				url: '/user',
				method: 'PUT',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
		}),

		updateAvatar: builder.mutation({
			query: (body) => ({
				url: '/user/update-avatar',
				method: 'PUT',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled

					console.log(data)
					dispatch(
						setUser({
							user: data?.metaData?.userInfo,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})

export const {
	useRegisterMutation,
	useVerificationMutation,
	useLoginMutation,
	useLogoutMutation,
	useChangePasswordMutation,
	useUpdateProfileMutation,
	useUpdateAvatarMutation,
} = authApi
