import { setCourse, setInvoices, setUsers } from '../slices/admin.slice'
import { appApi } from './app.api'

export const adminApi = appApi.injectEndpoints({
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

		retrieveCourses: builder.query({
			query: (body) => ({
				url: '/course',
				method: 'GET',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					dispatch(
						setCourse({
							course: data.metaData?.coursesInfo,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),

		deleteCourse: builder.mutation({
			query: (courseId) => ({
				url: `/course/${courseId}`,
				method: 'DELETE',
				body,
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
		}),

		retrieveUsers: builder.query({
			query: () => ({
				url: '/user',
				method: 'GET',
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					dispatch(
						setUsers({
							users: data.metaData?.users,
						}),
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),

		retrieveInvoice: builder.query({
			query: () => ({
				url: '/order',
				method: 'GET',
				credentials: 'include',
				headers: {
					Authorization: JSON.parse(window.localStorage.getItem('token')) || '',
					'x-client-id': JSON.parse(window.localStorage.getItem('_id')) || '',
				},
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					dispatch(
						setInvoices({
							invoices: data.metaData?.orders,
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
	usePublishCourseMutation,
	useRetrieveCoursesQuery,
	useRetrieveUsersQuery,
	useRetrieveInvoiceQuery,
	useDeleteCourseMutation,
} = adminApi
