import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Verification = () => {
	const [invalidError, setInvalidError] = useState(false)

	const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

	const [verifyNumber, setVerifyNumber] = useState({
		0: '',
		1: '',
		2: '',
		3: '',
	})

	const verificationHandler = async () => {
		const verificationNumber = Object.values(verifyNumber).join('')

		if (verificationNumber.length !== 4) {
			setInvalidError(true)
			return
		}
	}

	const handleInputChange = (index, value) => {
		if (!/^\d$/.test(value) && value !== '') {
			return
		}

		setInvalidError(false)
		const newVerifyNumber = { ...verifyNumber, [index]: value }
		setVerifyNumber(newVerifyNumber)

		if (value === '' && index > 0) {
			inputRefs[index - 1].current?.focus()
		} else if (value.length === 1 && index < 3) {
			inputRefs[index + 1].current?.focus()
		}
	}

	return (
		<div className=' flex-col'>
			<div className='m-auto flex items-center justify-between my-4'>
				{Object.keys(verifyNumber).map((key, index) => (
					<Input
						key={key}
						ref={inputRefs[index]}
						className={`w-[65px] h-[65px] bg-transparent border-[1px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
							invalidError
								? 'shake border-red-500'
								: 'dark:border-white border-[#0000004a]'
						}`}
						placeholder=''
						maxLength={1}
						value={verifyNumber[key]}
						onChange={(e) => handleInputChange(index, e.target.value)}
					/>
				))}
			</div>
			<div className='w-full flex justify-center'>
				<Button onClick={verificationHandler} className='w-full my-4'>
					Verify OTP
				</Button>
			</div>
		</div>
	)
}

export default Verification
