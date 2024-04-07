import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-primary text-primary-foreground p-4 py-16'>
			<div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='grid gap-8 sm:grid-cols-2 grid-cols-4'>
					<div className='space-y-3'>
						<h3 className='text-[20px] font-[600]'>About</h3>
						<ul className='space-y-4'>
							<li>
								<Link to='/about' className='text-base '>
									Our Story
								</Link>
							</li>
							<li>
								<Link to='/privacy-policy' className='text-base '>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link to='/faq' className='text-base '>
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<h3 className='text-[20px] font-[600]'>Quick Links</h3>
						<ul className='space-y-4'>
							<li>
								<Link to='/courses' className='text-base '>
									Courses
								</Link>
							</li>
							<li>
								<Link to='/profile' className='text-base '>
									My Account
								</Link>
							</li>
							<li>
								<Link to='/course' className='text-base '>
									Course Dashboard
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<h3 className='text-[20px] font-[600]'>Social Links</h3>
						<ul className='space-y-4'>
							<li>
								<Link
									to='https://www.youtube.com/channel/'
									className='text-base '
								>
									Youtube
								</Link>
							</li>
							<li>
								<Link to='https://www.instagram.com/' className='text-base '>
									Instagram
								</Link>
							</li>
							<li>
								<Link to='https://www.github.com/' className='text-base '>
									github
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-[20px] font-[600] pb-3'>Contact Info</h3>
						<p className='text-base pb-2'>Call Us: 0399-331-472</p>

						<p className='text-base pb-2'>Address: Quan 7, Ho Chi Minh City</p>

						<p className='text-base  pb-2'>
							Mail Us: huynhnhathao0609@gmail.com
						</p>
					</div>
				</div>
				<br />
				<p className='text-center'>
					Copyright © 2024 Elearning | All Rights Reserved
				</p>
			</div>
			<br />
		</footer>
	)
}

export default Footer
