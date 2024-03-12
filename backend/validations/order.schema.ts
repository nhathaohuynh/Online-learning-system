import { z } from 'zod'

export const createOrderSchema = z.object({
	body: z.object({
		courseId: z.string(),
		paymentInfo: z.string().optional(),
	}),
})
