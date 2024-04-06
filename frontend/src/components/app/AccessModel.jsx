import { ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Verification from './Verification'

const AccessModel = ({ setModel }) => {
	const [typeModel, setTypeModel] = useState('login')
	return (
		<div
			className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] 
        max-h-full bg-[rgba(255,255,255,0.5)]'
		>
			<div className='relative p-4 w-full max-w-lg h-auto flex m-auto mt-20 '>
				<div className='relative bg-primary-foreground rounded-lg shadow w-full '>
					<div
						className='p-4 md:p-5 border-b rounded-t flex-col'
						onClick={(e) => e.stopPropagation()}
					>
						{typeModel === 'login' ? (
							<>
								<div className='flex items-center justify-between px-5 py-0'>
									<h1 className='text-3xl font-medium text-center'>
										Login with E-Learning
									</h1>
									<button
										onClick={() => setModel(false)}
										type='button'
										class='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
										data-modal-hide='authentication-modal'
									>
										<svg
											class='w-3 h-3'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 14 14'
										>
											<path
												stroke='currentColor'
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
											/>
										</svg>
										<span class='sr-only'>Close modal</span>
									</button>
								</div>
								<LoginForm />
								<div class='text-sm font-medium text-gray-500 px-5 py-3'>
									Not registered?{' '}
									<Link
										class='text-blue-700 hover:underline dark:text-blue-500'
										onClick={() => setTypeModel('verification')}
									>
										Sign up
									</Link>
								</div>
							</>
						) : null}

						{typeModel === 'register' ? (
							<>
								<div className='flex items-center justify-between p-5'>
									<h1 className='text-3xl font-medium text-center'>
										Register with E-Learning
									</h1>
									<button
										onClick={() => setModel(false)}
										type='button'
										class='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
										data-modal-hide='authentication-modal'
									>
										<svg
											class='w-3 h-3'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 14 14'
										>
											<path
												stroke='currentColor'
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
											/>
										</svg>
										<span class='sr-only'>Close modal</span>
									</button>
								</div>
								<RegisterForm />
								<div class='text-sm font-medium text-gray-500 px-5 py-3'>
									You hace anccount?{' '}
									<Link
										class='text-blue-700 hover:underline dark:text-blue-500'
										onClick={() => setTypeModel('login')}
									>
										Sign in
									</Link>
								</div>
							</>
						) : null}

						{typeModel === 'verification' ? (
							<>
								<div className='flex items-center justify-between px-5 py-0'>
									<h1 className='text-3xl font-medium text-center'>
										Verification your account
									</h1>
									<button
										onClick={() => setModel(false)}
										type='button'
										class='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
										data-modal-hide='authentication-modal'
									>
										<svg
											class='w-3 h-3'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 14 14'
										>
											<path
												stroke='currentColor'
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
											/>
										</svg>
										<span class='sr-only'>Close modal</span>
									</button>
								</div>
								<br />
								<div className='w-full flex items-center justify-center mt-2'>
									<div className='w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
										<ShieldCheck size={40} />
									</div>
								</div>
								<div className='px-5'>
									<Verification />
								</div>

								<div class='text-sm font-medium text-gray-500 px-5 py-3'>
									Go back sign in?{' '}
									<Link
										className='text-blue-700 hover:underline dark:text-blue-500'
										onClick={() => setTypeModel('login')}
									>
										Sign in
									</Link>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccessModel
