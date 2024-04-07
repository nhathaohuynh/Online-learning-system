import { useChangePasswordMutation } from '@/redux/queries/auth.api'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Spinner from '../app/Spinner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const changePasswordSchema = z
	.object({
		password: z
			.string()
			.min(6, 'Password should be at least 8 characters long')
			.max(20, 'Password should not exceed 20 characters long'),
		newPassword: z
			.string()
			.min(6, 'New password should be at least 8 characters long')
			.max(20, 'Password should not exceed 20 characters long'),
		confirmPassword: z
			.string()
			.min(6, 'Confirm password should be at least 8 characters long')
			.max(20, 'Password should not exceed 20 characters long'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'New password and confirm password must match',
		path: ['confirmPassword'], // This is where the error message will be attached
	})

const ChangePassword = () => {
	const initialForm = {
		password: '',
		newPassword: '',
		confirmPassword: '',
	}

	const [changePassword, { isSuccess, isLoading, error }] =
		useChangePasswordMutation()

	const [form, setForm] = useState(initialForm)

	const handleChangeInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const validatedData = changePasswordSchema.parse(form)

			const body = {
				oldPassword: validatedData.password,
				newPassword: validatedData.newPassword,
			}

			await changePassword(body)

			setForm(initialForm)
		} catch (error) {
			// If the form data is not valid, parse will throw an error.
			// You can handle this error to show validation messages.
			console.log(error)
			toast.error(error.errors[0].message)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Password changed successfully')
		}

		if (error) {
			toast.error(error?.data?.message)
		}
	}, [isSuccess, error])
	return (
		<div>
			<div className='w-full flex justify-center'>
				<h1 className='text-primary-foreground font-semibold text-[32px]'>
					Update new password
				</h1>
			</div>
			<br />
			<br />
			<div className='w-full pl-6 800px:pl-10'>
				<form onSubmit={handleSubmit}>
					<div className='800px:w-[50%] m-auto block pb-4 text-primary-foreground'>
						<div className='w-[100%]'>
							<label className='block pb-2'>Password</label>
							<Input
								type='password'
								name='password'
								className={`!w-[95%] mb-4 800px:mb-0 text-primary focus-visible:ring-offset-0 bg-transparent dark:text-black text-white`}
								required
								value={form.password}
								onChange={(e) => handleChangeInput(e)}
							/>
						</div>
						<div className='w-[100%] pt-4'>
							<label className='block pb-2'>New password</label>
							<Input
								type='password'
								name='newPassword'
								className={`!w-[95%] mb-1 800px:mb-0 text-primary focus-visible:ring-offset-0 bg-transparent dark:text-black text-white`}
								required
								value={form.newPassword}
								onChange={(e) => handleChangeInput(e)}
							/>
						</div>

						<div className='w-[100%] pt-4'>
							<label className='block pb-2'>Confirm password</label>
							<Input
								type='password'
								name='confirmPassword'
								className={`!w-[95%] mb-1 800px:mb-0 text-primary focus-visible:ring-offset-0 bg-transparent dark:text-black text-white`}
								required
								value={form.confirmPassword}
								onChange={(e) => handleChangeInput(e)}
							/>
						</div>
						<Button
							className='bg-blue-900 w-[95%] mt-8 hover:bg-blue-500 text-white'
							type='submit'
						>
							{isLoading ? <Spinner /> : 'Change Password'}
						</Button>
					</div>
				</form>
				<br />
			</div>
		</div>
	)
}

export default ChangePassword
