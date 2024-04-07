import React from 'react'
import { Link } from 'react-router-dom'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

const navItemsData = [
	{
		name: 'Home',
		url: '/',
	},
	{
		name: 'Courses',
		url: '/courses',
	},
	{
		name: 'About',
		url: '/about',
	},
	{
		name: 'Policy',
		url: '/policy',
	},
	{
		name: 'FAQ',
		url: '/faq',
	},
]

const NavItems = ({ activeItem }) => {
	return (
		<div>
			<div className='800px:flex'>
				<NavigationMenu>
					<NavigationMenuList>
						{navItemsData &&
							navItemsData.map((i, index) => (
								<NavigationMenuItem key={crypto.randomUUID()}>
									<NavigationMenuLink
										href={`${i.url}`}
										className={`${
											activeItem === index
												? ' text-red-500'
												: ' text-primary-foreground'
										} text-[18px] px-6 font-Poppins font-[400] list-none transition-all duration-300 transform hover:scale-110 hover:text-red-500`}
									>
										{i.name}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}

export default NavItems
