import AdminSidebar from '@/components/admin/AdminSidebar'
import DashboardHero from '@/components/admin/DashboardHero'
import React from 'react'

const AdminDashboardLayout = () => {
	return (
		<div>
			{/* <AdminProtected> */}
			<div className='flex min-h-screen'>
				<div className='1500px:w-[16%] w-1/5'>
					<AdminSidebar />
				</div>
				<div className='w-[85%]'>
					<DashboardHero isDashboard={true} />
				</div>
			</div>
			{/* </AdminProtected> */}
		</div>
	)
}

export default AdminDashboardLayout
