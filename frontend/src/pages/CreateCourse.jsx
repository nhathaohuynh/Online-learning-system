import CourseContent from '@/components/admin/CourseContent'
import CourseData from '@/components/admin/CourseData'
import CourseInformation from '@/components/admin/CourseInfomation'
import CourseOptions from '@/components/admin/CourseOptions'
import CoursePreview from '@/components/admin/CoursePreview'
import { usePublishCourseMutation } from '@/redux/queries/course'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const CreateCourse = () => {
	const [active, setActive] = useState(0)
	const [publishCourse, { isLoading, isSuccess, error }] =
		usePublishCourseMutation()
	const [courseInfo, setCourseInfo] = useState({
		name: '',
		description: '',
		price: '',
		estimatedPrice: '',
		tags: '',
		level: '',
		categories: '',
		demoUrl: '',
		thumbnail: '',
	})
	const [benefits, setBenefits] = useState([{ title: '' }])
	const [prerequisites, setPrerequisites] = useState([{ title: '' }])
	const [courseContentData, setCourseContentData] = useState([
		{
			videoUrl: '',
			title: '',
			description: '',
			videoSection: 'Untitled Section',
			videoLength: '',
			links: [
				{
					title: '',
					url: '',
				},
			],
			suggestion: '',
		},
	])

	const [courseData, setCourseData] = useState({})

	const handleSubmit = async () => {
		// Format benefits array
		const formattedBenefits = benefits.map((benefit) => ({
			title: benefit.title,
		}))
		// Format prerequisites array
		const formattedPrerequisites = prerequisites.map((prerequisite) => ({
			title: prerequisite.title,
		}))

		// Format course content array
		const formattedCourseContentData = courseContentData.map(
			(courseContent) => ({
				videoUrl: courseContent.videoUrl,
				title: courseContent.title,
				description: courseContent.description,
				videoLength: +courseContent.videoLength,
				videoSection: courseContent.videoSection,
				links: courseContent.links.map((link) => ({
					title: link.title,
					url: link.url,
				})),
				suggestion: courseContent.suggestion,
			}),
		)

		//   prepare our data object
		const data = {
			name: courseInfo.name,
			description: courseInfo.description,
			categories: courseInfo.categories,
			price: courseInfo.price,
			estimatedPrice: courseInfo.estimatedPrice,
			tags: courseInfo.tags,
			thumbnail: courseInfo.thumbnail,
			level: courseInfo.level,
			demoUrl: courseInfo.demoUrl,
			totalVideos: courseContentData.length,
			benefits: formattedBenefits,
			prerequisites: formattedPrerequisites,
			courseData: formattedCourseContentData,
		}
		setCourseData(data)
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Course is being published')
		}

		if (error) {
			toast.error(error?.data?.message)
		}
	}, [isSuccess, error])

	const handleCourseCreate = async (e) => {
		console.log(courseData)

		const body = {
			...courseData,
			price: +courseData?.price,
			estimatedPrice: +courseData?.estimatedPrice,
			dataCourse: courseData?.courseData,
		}
		console.log(body)
		await publishCourse(body)
	}

	return (
		<div className='w-full flex min-h-screen'>
			<div className='w-[80%]'>
				{active === 0 && (
					<CourseInformation
						courseInfo={courseInfo}
						setCourseInfo={setCourseInfo}
						active={active}
						setActive={setActive}
					/>
				)}

				{active === 1 && (
					<CourseData
						benefits={benefits}
						setBenefits={setBenefits}
						prerequisites={prerequisites}
						setPrerequisites={setPrerequisites}
						active={active}
						setActive={setActive}
					/>
				)}

				{active === 2 && (
					<CourseContent
						active={active}
						setActive={setActive}
						courseContentData={courseContentData}
						setCourseContentData={setCourseContentData}
						handleSubmit={handleSubmit}
					/>
				)}

				{active === 3 && (
					<CoursePreview
						active={active}
						setActive={setActive}
						courseData={courseData}
						handleCourseCreate={handleCourseCreate}
					/>
				)}
			</div>
			<div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
				<CourseOptions active={active} setActive={setActive} />
			</div>
		</div>
	)
}

export default CreateCourse
