import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useRetrieveInvoiceQuery } from '@/redux/queries/adminApi'
import { Pencil, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Invoice = () => {
	const { data } = useRetrieveInvoiceQuery()
	const invoices = useSelector((state) => state.adminData.invoices)
	const [invoiceData, setInvoiceData] = useState([])

	console.log(invoices)
	useEffect(() => {
		if (invoices) {
			setInvoiceData(invoices)
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
						<TableHead>Status</TableHead>
						<TableHead>Created</TableHead>
						<TableHead className='text-center'>Delete</TableHead>
						<TableHead>Edit</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoiceData?.length > 0 &&
						invoiceData?.map((invoice, index) => {
							const date = new Date(invoice?.createdAt)
							return (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{invoice?.userId?.name}</TableCell>
									<TableCell>{invoice?.userId?.email}</TableCell>
									<TableCell>Done</TableCell>
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

export default Invoice
