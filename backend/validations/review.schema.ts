import { z } from 'zod'

export const reviewBodySchema = z.object({
	body: z.object({
		comment: z.string(),
		rating: z.enum(['1', '2', '3', '4', '5']),
		courseId: z.string(),
	}),
})
