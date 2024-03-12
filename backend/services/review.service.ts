import { findCourseByIdAndReview } from '../models/repository/course.repo'
import { createNewReview } from '../models/repository/review.repo'
import { findUserById } from '../models/repository/user.repo'
import { BadRequest } from '../utils/error.response'
import { IBodyReview } from '../utils/types'

class ReviewService {
	async handleAddReview(userId: string, body: IBodyReview) {
		const { courseId, rating, comment } = body
		const userPromise = findUserById(userId)
		const coursePromise = findCourseByIdAndReview(courseId)
		const [user, course] = await Promise.all([userPromise, coursePromise])

		if (!course || !user) throw new BadRequest('Something went wrong.')

		const isBelongsToCourse = user.courses.some(
			(course) => course.courseId === courseId,
		)
		if (!isBelongsToCourse)
			throw new BadRequest('You are not eligible to access this course')

		const isReview = course.reviews.some((review) => {
			return JSON.parse(JSON.stringify(review.user)) == userId
		})
		if (isReview) throw new BadRequest('You already review this course')

		const payload = {
			user: userId,
			rating: +rating,
			comment,
		}
		const review = await createNewReview(payload)

		if (!review) throw new BadRequest('Occuring with creating review.')

		const averageRating =
			course.reviews.length > 0
				? (course.reviews.reduce((totalRating, review) => {
						return totalRating + +review.rating
				  }, 0) +
						+review.rating) /
				  course.reviews.length
				: review.rating

		console.log(averageRating)

		course.reviews.push(review._id)
		course.topTenReviews?.push(review)
		course.ratings = averageRating

		await course.save()
		const notification = {
			title: 'New review recived',
			message: `${user.name} has given a review in ${course.name}`,
		}

		return {
			review,
		}
	}
}

export default new ReviewService()
