import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, z } from 'zod'
import { BadRequest } from '../utils/error.response'
const validate =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
			})
			return next()
		} catch (err: any) {
			return next(new BadRequest(err.errors[0].message))
		}
	}

export const validateBodyAndParams =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
				params: req.params,
			})
			return next()
		} catch (err: any) {
			return next(new BadRequest(err.errors[0].message))
		}
	}

const paramsSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
})

export const validateParams =
	() => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await paramsSchema.parseAsync({
				params: req.params,
			})
			return next()
		} catch (err: any) {
			return next(new BadRequest(err.errors[0].message))
		}
	}

export default validate
