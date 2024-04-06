import Header from '@/components/app/Header'
import Hero from '@/components/app/Hero'
import React from 'react'
import { Outlet } from 'react-router-dom'
const RootLayout = () => {
	return (
		<main>
			<section>
				<Header />
				<Hero />
			</section>
			<section>
				<Outlet />
			</section>
		</main>
	)
}

export default RootLayout
