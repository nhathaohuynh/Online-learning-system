import path from '@/utils/path'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import bannder from '../../assets/banner-img-1.png'
import image1 from '../../assets/client-1.jpg'
import image2 from '../../assets/client-2.jpg'
import image3 from '../../assets/client-3.jpg'

const Hero = () => {
	return (
		<div className='w-full 1000px:flex items-center bg-primary'>
			<div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[600px] 1500px:w-[600px] 1100px:h-[500px] 1100px:w-[500px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14 bg-primary-foreground'></div>
			<div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10'>
				<img
					src={bannder}
					width={400}
					height={400}
					alt=''
					className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'
				/>
			</div>
			<div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>
				<h2 className='text-primary-foreground text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]'>
					Improve Your Online Learning Experience Better Instantly
				</h2>
				<br />
				<p className=' text-primary-foreground font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]'>
					We provide the best online learning platform for students,
					professionals
				</p>
				<br />
				<br />
				<div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center'>
					<img src={image1} className='rounded-full' alt='' />
					<img src={image2} className='rounded-full ml-[-20px]' alt='' />
					<img src={image3} className='rounded-full ml-[-20px]' alt='' />
					<p className='font-Josefin  text-primary-foreground 1000px:pl-3 text-[18px] font-[600]'>
						500K+ People already trusted us.{' '}
						<Link to={`${path.COURSE}`} className='text-[crimson]'>
							View Courses
						</Link>
					</p>
				</div>
				<br />
			</div>
		</div>
	)
}

export default Hero
