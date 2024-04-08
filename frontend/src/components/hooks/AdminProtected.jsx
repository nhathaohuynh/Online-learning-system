import { useSelector } from 'react-redux'

export default function AdminProtected({ children }) {
	const user = useSelector((state) => state.app.user)

	const isAdmin = user?.role === 'admin'
	if (!isAdmin) {
		window.location.href = '/'
		return null
	}
	return children
}
