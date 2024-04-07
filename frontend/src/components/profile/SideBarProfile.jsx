import { BookOpenText, KeyRound, LogOut, Settings } from 'lucide-react'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import avatarDefault from '../../assets/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const SideBarProfile = ({ user, active, setActive, logOutHandler }) => {
	return (
		<div className=' h-[500px] text-primary flex flex-col gap-1'>
			<div
				className={`flex items-center hover:bg-blue-500 text-white rounded-md px-3 py-2 cursor-pointer h-[50px] w-[250px] ${
					active === 1 && 'bg-blue-500 transition-all'
				}`}
				onClick={() => setActive(1)}
			>
				<Avatar>
					<AvatarImage
						src={user?.avatar ? user?.avatar?.url : avatarDefault}
						className='w-[28px] h-[28px] p-0 m-auto object-contain rounded-full'
					/>
					<AvatarFallback>Avatar</AvatarFallback>
				</Avatar>
				<h5 className='pl-2'>My Account</h5>
			</div>
			<div
				className={`flex items-center hover:bg-blue-500 text-white rounded-md px-3 py-3 cursor-pointer h-[50px] w-[250px] ${
					active === 2 && 'bg-blue-500 transition-all'
				}`}
				onClick={() => setActive(2)}
			>
				<KeyRound className='cursor-pointer' />
				<h5 className='pl-2 '>Change Password</h5>
			</div>
			<div
				className={`flex items-center hover:bg-blue-500 text-white rounded-md px-3 py-3 cursor-pointer h-[50px] w-[250px] ${
					active === 3 && 'bg-blue-500 transition-all'
				}`}
				onClick={() => setActive(3)}
			>
				<BookOpenText className='cursor-pointer' />
				<h5 className='pl-2'>Enrolled Courses</h5>
			</div>

			{user.role === 'admin' && (
				<div>
					<Link
						className={` flex items-center hover:bg-blue-500 text-white rounded-md px-3 py-4 cursor-pointer ${
							active === 6 && 'bg-blue-500 transition-all'
						}`}
						to={'/admin'}
					>
						<Settings className='text-primary-foreground' />
						<h5 className='pl-2 text-primary-foreground'>Admin Dashboard</h5>
					</Link>
				</div>
			)}

			<div
				className={` flex items-center hover:bg-blue-500 text-white rounded-md px-3 py-3 cursor-pointer ${
					active === 4 && 'bg-blue-500 transition-all'
				}`}
				onClick={() => logOutHandler()}
			>
				<LogOut size={20} className='cursor-pointer' />
				<h5 className='pl-2'>Log Out</h5>
			</div>
		</div>
	)
}

export default SideBarProfile
