import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from './DashboardWidgets'

const DashboardHero = ({ isDashboard }) => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<DashboardHeader open={open} setOpen={setOpen} />
			{/* {isDashboard && <DashboardWidgets open={open} />} */}
			<div className='mt-[30px] min-h-screen'>
				<Outlet />
			</div>
		</div>
	)
}

export default DashboardHero
