import {
	ChevronLeft as ArrowBackIosIcon,
	ChevronRight as ArrowForwardIosIcon,
	BarChart3 as BarChartOutlinedIcon,
	LogOut as ExitToAppIcon,
	Users as GroupsIcon,
	Home as HomeOutlinedIcon,
	LineChart as ManageHistoryIcon,
	AreaChart as MapOutlinedIcon,
	CircleHelp as QuizIcon,
	ReceiptText as ReceiptOutlinedIcon,
	MonitorPlay as VideoCallIcon,
	PanelsTopLeft as WebIcon,
	Layers3 as WysiwygIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import avatarDefault from '../../assets/avatar.png'
import useTheme from '../app/ThemeProvider'
import { Button } from '../ui/button'

import { FolderKanban } from 'lucide-react'
const Item = ({ title, to, icon, selected = 'Dashboard', setSelected }) => {
	return (
		<Link to={to} className='hover:!bg-[unset] flex gap-2'>
			<MenuItem
				active={selected === title}
				onClick={() => setSelected(title)}
				icon={icon}
				className='hover:!bg-[unset]'
			>
				<span className='!text-[16px] !font-Poppins'>{title}</span>
			</MenuItem>
		</Link>
	)
}

const AdminSidebar = () => {
	const user = useSelector((state) => state.app.user)
	const [logout, setlogout] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [selected, setSelected] = useState('Dashboard')
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) {
		return null
	}

	const logoutHandler = () => {
		setlogout(true)
	}

	return (
		<div>
			<Sidebar
				collapsed={isCollapsed}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					height: '100vh',
					zIndex: 99999999999999,
					width: isCollapsed ? '0%' : '16%',
				}}
			>
				<Menu className='!bg-primary-foreground text-primary p-2'>
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
					>
						{!isCollapsed && (
							<div className='flex justify-between items-center'>
								<Button
									onClick={() => setIsCollapsed(!isCollapsed)}
									className='bg-transparent hover:bg-transparent flex gap-1'
								>
									<h3 className='text-[24px] font-Poppins font-bold uppercase dark:text-white text-black'>
										E-Learning
									</h3>
									<ArrowBackIosIcon className='text-primary' />
								</Button>
							</div>
						)}
					</MenuItem>

					{!isCollapsed && (
						<div className='mb-10'>
							<div className='flex justify-center items-center'>
								<img
									alt='profile-user'
									width={100}
									height={100}
									src={user?.avatar ? user?.avatar.url : avatarDefault}
									style={{
										cursor: 'pointer',
										borderRadius: '50%',
										border: '3px solid #5b6fe6',
									}}
								/>
							</div>
							<div className='text-center'>
								<h4 className='!text-[20px] text-primary mt-4'>{user?.name}</h4>
							</div>
						</div>
					)}

					<div className={`${isCollapsed && 'pl-[10%]'} `}>
						<Item
							title='Dashboard'
							to='/admin'
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<h5 className='!text-[18px] text-primary capitalize !font-[400] mt-[15px] ml-[5px] mr-[25px]'>
							{!isCollapsed && 'Data'}
						</h5>
						<Item
							title='Users'
							to='/admin/users'
							icon={<GroupsIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Item
							title='Invoices'
							to='/admin/invoices'
							icon={
								<ReceiptOutlinedIcon className='text-black dark:text-white' />
							}
							selected={selected}
							setSelected={setSelected}
						/>

						<h5 className='!text-[18px] text-primary capitalize !font-[400] mt-[15px] ml-[5px] mr-[20px]'>
							{!isCollapsed && 'Content'}
						</h5>
						<Item
							title='Create Course'
							to='/admin/create-course'
							icon={<VideoCallIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Item
							title='Live Courses'
							to='/admin/live-course'
							icon={<FolderKanban className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>

						<h5 className='!text-[18px] text-primary capitalize !font-[400] mt-[15px] ml-[5px] mr-[20px]'>
							{!isCollapsed && 'Customization'}
						</h5>
						<Item
							title='Hero'
							to='/admin/hero'
							icon={<WebIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='FAQ'
							to='/admin/faq'
							icon={<QuizIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Categories'
							to='/admin/categories'
							icon={<WysiwygIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>

						<h6 className='!text-[18px] text-primary capitalize !font-[400] mt-[15px] ml-[5px] mr-[20px]'>
							{!isCollapsed && 'Analytics'}
						</h6>
						<Item
							title='Courses Analytics'
							to='/admin/courses-analytics'
							icon={
								<BarChartOutlinedIcon className='text-black dark:text-white' />
							}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Orders Analytics'
							to='/admin/orders-analytics'
							icon={<MapOutlinedIcon className='text-black dark:text-white' />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Item
							title='Users Analytics'
							to='/admin/users-analytics'
							icon={
								<ManageHistoryIcon className='text-black dark:text-white' />
							}
							selected={selected}
							setSelected={setSelected}
						/>

						<h6 className='!text-[18px] text-primary capitalize !font-[400] mt-[15px] ml-[5px] mr-[20px]'>
							{!isCollapsed && 'Action'}
						</h6>
						<div onClick={logoutHandler}>
							<Item
								title='Logout'
								to='/'
								icon={<ExitToAppIcon className='text-black dark:text-white' />}
								selected={selected}
								setSelected={setSelected}
							/>
						</div>
					</div>
				</Menu>
			</Sidebar>
		</div>
	)
}

export default AdminSidebar
