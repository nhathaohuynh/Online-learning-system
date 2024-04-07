import UserAuth from './userAuth'

export default function Protected({ children }) {
	const isAuthenticated = UserAuth()

	if (!isAuthenticated) {
		window.location.href = '/'
		return null
	}

	return children
}
