import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: 'Password must contain at least 6 character(s)' })
		.max(20, { message: 'Password must not exceed 20 character(s)' }),
})
const LoginForm = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	function onSubmit(values) {
		console.log(values)
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
					Login
					<LogIn size={20} />
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm
