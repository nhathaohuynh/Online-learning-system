import Protected from '@/components/hooks/useProtected'
import ChangePassword from '@/components/profile/ChangePassword'
import ProfileInfo from '@/components/profile/ProfileInfo'
import SideBarProfile from '@/components/profile/SideBarProfile'
import { useLogoutMutation } from '@/redux/queries/auth.api'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const Profile = () => {
	const user = useSelector((state) => state.app.user)
	const [active, setActive] = React.useState(1)
	const [logout, { isSuccess, error }] = useLogoutMutation()

	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/'
		}

		if (error) {
			toast.error(error?.data?.message || 'Logout failed')
			console.log(error)
		}
	}, [isSuccess, error])

	const logOutHandler = () => {
		logout()
	}

	return (
		<div className='h-screen bg-primary'>
			<Protected>
				<div className='w-[85%] flex mx-auto'>
					<div
						className={`bg-blue-900 rounded-md shadow-lg mt-[80px] mb-[80px] sticky left-[30px] p-4`}
					>
						<SideBarProfile
							user={user}
							active={active}
							setActive={setActive}
							logOutHandler={logOutHandler}
						/>
					</div>
					{active === 1 && (
						<div className='w-full h-full bg-transparent mt-[80px]'>
							<ProfileInfo user={user} />
						</div>
					)}

					{active === 2 && (
						<div className='w-full h-full bg-transparent mt-[80px]'>
							<ChangePassword />
						</div>
					)}

					{/* {active === 3 && (
						<div className='w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]'>
							<div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
								{courses &&
									courses.map((item, index) => (
										<CourseCard item={item} key={index} isProfile={true} />
									))}
							</div>
							{courses.length === 0 && (
								<h1 className='text-center text-[18px] font-Poppins dark:text-white text-black'>
									You don&apos;t have any purchased courses!
								</h1>
							)}
						</div>
					)} */}
				</div>
			</Protected>
		</div>
	)
}

export default Profile
