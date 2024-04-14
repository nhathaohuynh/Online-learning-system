import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useRetrieveUsersQuery } from '@/redux/queries/adminApi'
import { Pencil, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
	const { data } = useRetrieveUsersQuery()
	const users = useSelector((state) => state.adminData.users)
	const [userData, setUsersData] = useState([])

	useEffect(() => {
		if (users) {
			setUsersData(users)
		}
	}, [data])
	return (
		<div className='w-full flex min-h-screen p-4'>
			<Table className='w-full mt-10 '>
				<TableCaption>A list of users.</TableCaption>
				<TableHeader>
					<TableRow className='uppercase'>
						<TableHead>ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>email</TableHead>

						<TableHead>Active</TableHead>
						<TableHead className='text-center'>Delete</TableHead>
						<TableHead>Edit</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userData?.length > 0 &&
						userData?.map((user, index) => {
							const date = new Date(user?.createdAt)
							return (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{user?.name}</TableCell>
									<TableCell>{user?.email}</TableCell>
									<TableCell>
										{user?.isVerified ? 'Active' : 'Inactive'}
									</TableCell>
									<TableCell>{date.toLocaleDateString()}</TableCell>
									<TableCell className='flex justify-center'>
										<Trash />
									</TableCell>
									<TableCell>
										<Pencil />
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
		</div>
	)
}

export default Users
