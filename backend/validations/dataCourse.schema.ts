import { z } from 'zod'

export const updateDataCourseSchema = z.object({
	body: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		videoUrl: z.string().optional(),
		videoSection: z.string().optional(),
		videoLength: z.number().optional(),
		links: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})
