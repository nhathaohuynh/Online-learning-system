import Footer from '@/components/app/Footer'
import Header from '@/components/app/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
const RootLayout = () => {
	return (
		<main>
			<section className='shadow-2xl '>
				<Header />
			</section>
			<section>
				<Outlet />
			</section>
			<section className='border-t shadow-md '>
				<Footer />
			</section>
		</main>
	)
}

export default RootLayout
