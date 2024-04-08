import React, { useEffect, useState } from 'react'

const styles = {
	title:
		'text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2',
	label: 'text-[16px] font-Poppins text-black dark:text-white',
	input:
		'w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins',
	button:
		'flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold',
}

const CourseInformation = ({
	courseInfo,
	setCourseInfo,
	active,
	setActive,
}) => {
	const [dragging, setDragging] = useState(false)
	const [categories, setCategories] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()
		setActive(active + 1)
	}

	const handleFileChange = (e) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()

			reader.onload = (e) => {
				if (reader.readyState === 2) {
					setCourseInfo({ ...courseInfo, thumbnail: reader.result })
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		setDragging(false)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		setDragging(false)

		const file = e.dataTransfer.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.onload = () => {
				setCourseInfo({ ...courseInfo, thumbnail: reader.result })
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='w-[80%] m-auto mt-24'>
			<form onSubmit={handleSubmit} className={`${styles.label}`}>
				<div>
					<label htmlFor=''>Course Name</label>
					<input
						type='name'
						name=''
						required
						value={courseInfo.name}
						onChange={(e) =>
							setCourseInfo({ ...courseInfo, name: e.target.value })
						}
						id='name'
						placeholder='Your course name'
						className={`
            ${styles.input}`}
					/>
				</div>
				<br />
				<div className='mb-5'>
					<label className={`${styles.label}`}>Course Description</label>
					<textarea
						name=''
						id=''
						cols={30}
						rows={8}
						placeholder='Write something amazing...'
						className={`${styles.input} !h-min !py-2`}
						value={courseInfo.description}
						onChange={(e) =>
							setCourseInfo({ ...courseInfo, description: e.target.value })
						}
					></textarea>
				</div>
				<br />
				<div className='w-full flex justify-between'>
					<div className='w-[45%]'>
						<label className={`${styles.label}`}>Course Price</label>
						<input
							type='number'
							name=''
							required
							value={courseInfo.price}
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, price: e.target.value })
							}
							id='price'
							placeholder='29'
							className={`
            ${styles.input}`}
						/>
					</div>
					<div className='w-[50%]'>
						<label className={`${styles.label} w-[50%]`}>
							Estimated Price (optional)
						</label>
						<input
							type='number'
							name=''
							value={courseInfo.estimatedPrice}
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
							}
							id='price'
							placeholder='79'
							className={`
            ${styles.input}`}
						/>
					</div>
				</div>
				<br />
				<div className='w-full flex justify-between'>
					<div className='w-[45%]'>
						<label className={`${styles.label}`} htmlFor='email'>
							Course Tags
						</label>
						<input
							type='text'
							required
							name=''
							value={courseInfo.tags}
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, tags: e.target.value })
							}
							id='tags'
							placeholder='#MERN #Reactjs #Socket io #tailwind css'
							className={`
            ${styles.input}`}
						/>
					</div>
					<div className='w-[50%]'>
						<label className={`${styles.label} w-[50%]`}>
							Course Categories
						</label>
						<select
							name=''
							id=''
							className={`${styles.input}`}
							value={courseInfo.category}
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, categories: e.target.value })
							}
						>
							<option value=''>Select Category</option>
							{categories &&
								categories.map((item) => (
									<option value={item.title} key={item._id}>
										{item.title}
									</option>
								))}
						</select>
					</div>
				</div>
				<br />
				<div className='w-full flex justify-between'>
					<div className='w-[45%]'>
						<label className={`${styles.label}`}>Course Level</label>
						<input
							type='text'
							name=''
							value={courseInfo.level}
							required
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, level: e.target.value })
							}
							id='level'
							placeholder='Beginner/Intermediate/Expert'
							className={`
            ${styles.input}`}
						/>
					</div>
					<div className='w-[50%]'>
						<label className={`${styles.label} w-[50%]`}>Demo Url</label>
						<input
							type='text'
							name=''
							required
							value={courseInfo.demoUrl}
							onChange={(e) =>
								setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
							}
							id='demoUrl'
							placeholder='eer74fd'
							className={`
            ${styles.input}`}
						/>
					</div>
				</div>
				<br />
				<div className='w-full'>
					<input
						type='file'
						accept='image/*'
						id='file'
						className='hidden'
						onChange={handleFileChange}
					/>
					<label
						htmlFor='file'
						className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
							dragging ? 'bg-blue-500' : 'bg-transparent'
						}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{courseInfo.thumbnail ? (
							<img
								src={courseInfo.thumbnail}
								alt=''
								className='max-h-[400px] w-full object-cover'
							/>
						) : (
							<span className='text-black dark:text-white'>
								Drag and drop your thumbnail here or click to browse
							</span>
						)}
					</label>
				</div>
				<br />
				<div className='w-full flex items-center justify-end'>
					<input
						type='submit'
						value='Next'
						className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
					/>
				</div>
				<br />
				<br />
			</form>
		</div>
	)
}

export default CourseInformation
