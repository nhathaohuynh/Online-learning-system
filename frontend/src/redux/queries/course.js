import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser, userLoggedIn, userRegistration } from '../slices/app.slice'
import { appApi } from './app.api'

export const courseApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		publishCourse: builder.mutation({
			query: (body) => ({
				url: '/course',
				method: 'POST',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
		}),
	}),
})

export const { usePublishCourseMutation } = courseApi
