import { z } from 'zod'

export const registerSchema = z.object({
	body: z.object({
		name: z.string().min(3, 'Name must be at least 3 character long'),
		email: z.string().email(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be at least 20 characters long'),
		avatar: z.string().optional(),
	}),
})

export const activationSchema = z.object({
	body: z.object({
		activationCode: z.number(),
		activationToken: z.string(),
	}),
})

export const loginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be at least 20 characters long'),
	}),
})

export const socialAuthSchema = z.object({
	body: z.object({
		name: z.string().min(3, 'Name must be at least 3 character long'),
		email: z.string().email(),
		avatar: z.string().optional(),
	}),
})

export const updateUserInfoSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, 'Name must be at least 3 character long')
			.optional(),
		email: z.string().email().optional(),
		courses: z.array(
			z.object({
				courseId: z.string(),
			}),
		),
	}),
})

export const updatePasswordSchema = z.object({
	body: z.object({
		oldPassword: z.string(),
		newPassword: z
			.string()
			.min(6, 'New password must be at least 6 characters long')
			.max(20, 'New password must be at least 20 characters long'),
	}),
})

export const updateAvatarSchema = z.object({
	body: z.object({
		avatar: z.string(),
	}),
})

export enum UserRole {
	Admin = '1111',
	User = '0000',
	Teacher = '2222',
}

export const updateRoleSchema = z.object({
	body: z.object({
		userId: z.string(),
		role: z.enum([UserRole.Admin, UserRole.User, UserRole.Teacher]),
	}),
})
