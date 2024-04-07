import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CircleUser } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import AccessModel from './AccessModel'
import { ModeToggle } from './ModeToggle'
import NavItems from './NavItems'
const Header = () => {
	const app = useSelector((state) => state?.app)

	const [activeItem, setActiveItem] = useState(0)

	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case '/profile':
				setActiveItem(5)
				break
			case '/courses':
				setActiveItem(1)
				break
			// Add more cases as needed
			case '/about':
				setActiveItem(2)
				break
			case '/policy':
				setActiveItem(3)
				break
			case '/FAQ':
				setActiveItem(4)
				break
			default:
				setActiveItem(0)
		}
	}, [location])

	const [openAccessModel, setOpenAccessModel] = useState(false)

	const openAccessModelHandler = () => {
		setOpenAccessModel(!openAccessModel)
	}
	return (
		<header>
			<div className='bg-primary text-primary-foreground border-b border-[rgba(0,0,0,0.4)] shadow-lg'>
				<div className='w-[95%] 800px:w-[92%] m-auto h-full'>
					<div className='w-full h-[80px] flex items-center justify-between p-3'>
						<div>
							<Link
								to={'/'}
								className='text-[25px] font-Poppins font-[500] text-primary-foreground'
							>
								E-learning
							</Link>
						</div>
						<div className='flex items-center gap-2'>
							<NavItems activeItem={activeItem} />
							<ModeToggle />
							{app?.user ? (
								<Link to='/profile' className='flex items-center gap-2'>
									<Avatar>
										<AvatarImage
											src={app?.user?.avatar ? app?.user?.avatar?.url : avatar}
											className='w-[32px] h-[32px]  m-auto object-contain rounded-full'
										/>
										<AvatarFallback>Avatar</AvatarFallback>
									</Avatar>
									<span>{app?.user?.name}</span>
								</Link>
							) : (
								<div
									className='text-[25px] font-Poppins font-[500] text-primary-foreground  transition-all duration-300 transform hover:scale-110 hover:text-red-500 cursor-pointer'
									onClick={() => openAccessModelHandler()}
								>
									<CircleUser size={24} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{openAccessModel && <AccessModel setModel={setOpenAccessModel} />}
		</header>
	)
}

export default Header
