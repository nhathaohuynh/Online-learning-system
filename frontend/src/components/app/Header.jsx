import { CircleUser } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AccessModel from './AccessModel'
import { ModeToggle } from './ModeToggle'
import NavItems from './NavItems'
const Header = () => {
	const app = useSelector((state) => state?.app)

	const [active, setActive] = useState(false)
	const [openAccessModel, setOpenAccessModel] = useState(false)

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 85) {
				setActive(true)
			} else {
				setActive(false)
			}
		})
	}

	const openAccessModelHandler = () => {
		setOpenAccessModel(!openAccessModel)
	}
	return (
		<header>
			<div className='bg-primary text-primary-foreground'>
				<div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
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
							<NavItems activeItem={0} />
							<ModeToggle />
							{app?.user ? (
								<Link to='/profile' className='flex items-center gap-2'>
									<CircleUser size={24} />
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
