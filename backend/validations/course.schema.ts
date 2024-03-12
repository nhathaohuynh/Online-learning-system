import { z } from 'zod'

export const courseSchema = z.object({
	body: z.object({
		name: z.string(),
		description: z.string(),
		price: z.number(),
		estimatedPrice: z.number().optional(),
		thumbnail: z.string().optional(),
		tags: z.string(),
		level: z.string(),
		demoUrl: z.string(),
		benefits: z.array(z.object({ title: z.string() })),
		prerequisites: z.array(z.object({ title: z.string() })),
		dataCourse: z.array(
			z.object({
				title: z.string(),
				description: z.string(),
				videoUrl: z.string(),
				videoSection: z.string(),
				videoLength: z.number(),
				links: z.array(z.object({ title: z.string(), url: z.string() })),
			}),
		),
	}),
})

export const editCourseSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		price: z.number().optional(),
		estimatedPrice: z.number().optional(),
		thumbnail: z.string().optional().optional(),
		tags: z.string().optional(),
		level: z.string().optional(),
		demoUrl: z.string().optional(),
		benefits: z.array(z.object({ title: z.string() })).optional(),
		prerequisites: z.array(z.object({ title: z.string() })).optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})

export const editDataCourseSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		price: z.number().optional(),
		estimatedPrice: z.number().optional(),
		thumbnail: z.string().optional().optional(),
		tags: z.string().optional(),
		level: z.string().optional(),
		demoUrl: z.string().optional(),
		benefits: z.array(z.object({ title: z.string() })).optional(),
		prerequisites: z.array(z.object({ title: z.string() })).optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})
