import {
	useUpdateAvatarMutation,
	useUpdateProfileMutation,
} from '@/redux/queries/auth.api'
import { Camera } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar.png'
import Spinner from '../app/Spinner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

const ProfileInfo = () => {
	const user = useSelector((state) => state.app?.user)
	const [
		updateAvatar,
		{
			isSuccess: avatarSuccess,
			error: avatarError,
			isLoading: loadingUpdateAvatar,
		},
	] = useUpdateAvatarMutation()

	const imageHandler = async (e) => {
		const fileReader = new FileReader()

		fileReader.onload = () => {
			if (fileReader.readyState === 2) {
				const avatar = fileReader.result
				const body = {
					avatar,
				}
				updateAvatar(body)
			}
		}
		fileReader.readAsDataURL(e.target.files[0])
	}

	const [name, setName] = useState(user && user.name)
	const [updateProfile, { isSuccess, error, isLoading }] =
		useUpdateProfileMutation()
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (name.length < 3 || name.length > 100) {
			return
		}

		const body = {
			name,
		}

		await updateProfile(body)
	}

	useEffect(() => {
		if (avatarSuccess) {
			toast.success('Avatar updated successfully')
		}
		if (avatarError) {
			toast.error(avatarError?.data?.message || 'Avatar update failed')
		}
	}, [avatarSuccess, avatarError])

	useEffect(() => {
		if (isSuccess) {
			toast.success('Profile updated successfully')
		}
		if (error) {
			toast.error(error?.data?.message || 'Profile update failed')
		}
	}, [isSuccess, error])
	return (
		<div>
			<div className='w-full flex justify-center'>
				<div className='relative'>
					{loadingUpdateAvatar ? (
						<div>
							<Skeleton className='w-[120px] h-[120px] rounded-full' />
						</div>
					) : (
						<img
							src={user?.avatar ? user?.avatar?.url : avatar}
							alt='Avatar'
							className='rounded-full w-[120px] h-[120px] object-cover'
						/>
					)}
					<Input
						type='file'
						name=''
						id='avatar'
						className='hidden'
						onChange={imageHandler}
						accept='image/png,image/jpg,image/jpeg,image/webp'
					/>
					<label htmlFor='avatar'>
						<div className='w-[30px] h-[30px] bg-primary-foreground text-primary rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
							<Camera size={20} className='z-1' />
						</div>
					</label>
				</div>
			</div>
			<br />
			<br />
			<div className='w-full pl-6 800px:pl-10'>
				<form onSubmit={handleSubmit}>
					<div className='800px:w-[50%] m-auto block pb-4 text-primary-foreground'>
						<div className='w-[100%]'>
							<label className='block pb-2'>Full Name</label>
							<Input
								type='text'
								className={`!w-[95%] mb-4 800px:mb-0 text-primary focus-visible:ring-offset-0 bg-transparent dark:text-black text-white`}
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='w-[100%] pt-4'>
							<label className='block pb-2'>Email Address</label>
							<Input
								type='text'
								readOnly
								className={`!w-[95%] mb-1 800px:mb-0 text-primary focus-visible:ring-offset-0 bg-transparent dark:text-black text-white`}
								required
								value={user?.email}
							/>
						</div>
						<Button
							className='bg-blue-900 w-[95%] mt-8 hover:bg-blue-500 text-white'
							type='submit'
						>
							{isLoading ? <Spinner /> : 'Update Profile'}
						</Button>
					</div>
				</form>
				<br />
			</div>
		</div>
	)
}

export default ProfileInfo
