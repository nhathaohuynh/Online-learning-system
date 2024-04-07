import { useSelector } from 'react-redux'

export default function UserAuth() {
	const user = useSelector((state) => state?.app?.user)

	if (user) {
		return true
	} else {
		return false
	}
}
