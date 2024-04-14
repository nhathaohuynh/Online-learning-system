import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	useDeleteCourseMutation,
	useRetrieveCoursesQuery,
} from '@/redux/queries/adminApi'
import { setCourse } from '@/redux/slices/admin.slice'
import { Pencil, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LiveCourse = () => {
	const { data } = useRetrieveCoursesQuery()
	const [deleteCourse, { isLoading, isSuccess }] = useDeleteCourseMutation()
	const courses = useSelector((state) => state.adminData.courses)
	const [courseData, setCoursesData] = useState([])

	useEffect(() => {
		if (courses) {
			setCoursesData(courses)
		}
	}, [data])

	const handleDeleteCourse = async (id) => {
		await deleteCourse(id)

		if (isSuccess) {
			setCourse(courses.filter((course) => course._id !== id))
			toast.success('Course deleted successfully')
		}
	}

	return (
		<div className='w-full flex min-h-screen p-4'>
			<Table className='w-full mt-10 '>
				<TableCaption>A list of courses.</TableCaption>
				<TableHeader>
					<TableRow className='uppercase'>
						<TableHead>ID</TableHead>
						<TableHead>Course Tile</TableHead>
						<TableHead>Ratings</TableHead>
						<TableHead>Purchased</TableHead>
						<TableHead>Created At</TableHead>
						<TableHead className='text-center'>Delete</TableHead>
						<TableHead>Edit</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{courseData?.length > 0 &&
						courseData?.map((course, index) => {
							const date = new Date(course?.createdAt)
							return (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{course?.name}</TableCell>
									<TableCell>{course?.ratings}</TableCell>
									<TableCell>{course?.purchased}</TableCell>
									<TableCell>{date.toLocaleDateString()}</TableCell>
									<TableCell
										className='flex justify-center'
										onClick={() => handleDeleteCourse(course?._id)}
									>
										<Trash />
									</TableCell>
									<TableCell>
										<Pencil />
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
		</div>
	)
}

export default LiveCourse
