import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/redux/queries/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Spinner from './Spinner'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: 'Password must contain at least 6 character(s)' })
		.max(20, { message: 'Password must not exceed 20 character(s)' }),
})
const LoginForm = ({ setModel }) => {
	const [login, { isLoading, isSuccess, error }] = useLoginMutation()
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successfully')
			setModel(false)
		}
		if (error) {
			toast.error(error?.data?.message || 'Login failed')
		}
	}, [isSuccess, error])

	async function onSubmit(values) {
		const body = {
			email: values.email,
			password: values.password,
		}

		await login(body)
	}
	return (
		<Form {...form} className='w-full h-full'>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 w-full p-5'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email *</FormLabel>
							<FormControl>
								<Input
									placeholder='example@gmail.com'
									{...field}
									className='outline-none focus-visible:to-blue-500'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password *</FormLabel>
							<FormControl>
								<Input
									placeholder='Your password'
									type='password'
									{...field}
									className='outline-none focus-visible:to-blue-500'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full bg-primary flex gap-2 items-center'
				>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							Login <LogIn size={20} />
						</>
					)}
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm
