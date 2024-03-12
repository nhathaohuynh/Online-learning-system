import { z } from 'zod'

export const questionSchema = z.object({
	body: z.object({
		dataCourseId: z.string(),
		content: z.string(),
	}),
})

export const anwserSchema = z.object({
	body: z.object({
		dataCourseId: z.string(),
		content: z.string(),
		questionId: z.string(),
	}),
})
