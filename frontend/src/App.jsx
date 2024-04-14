import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/app/ThemeProvider'
import CreateCourse from './pages/CreateCourse'
import Home from './pages/Home'
import Invoices from './pages/Invoices'
import LiveCourse from './pages/LiveCourse'
import Profile from './pages/Profile'
import Users from './pages/Users'
import AdminDashboardLayout from './pages/layouts/AdminDashboardLayout'
import RootLayout from './pages/layouts/RootLayout'
import path from './utils/path'

function App() {
	return (
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<BrowserRouter>
				<Routes>
					<Route path={path.ROOT} element={<RootLayout />}>
						<Route index element={<Home />} />
						<Route path={path.PROFILE} element={<Profile />} />
					</Route>

					<Route path={path.ADMIN} element={<AdminDashboardLayout />}>
						<Route index element={<h1>This is admin page</h1>}></Route>
						<Route path={path.CREATE_COURSE} element={<CreateCourse />}></Route>
						<Route path={path.LIVE_COURSE} element={<LiveCourse />}></Route>
						<Route path={path.USERS} element={<Users />}></Route>
						<Route path={path.INVOICES} element={<Invoices />}></Route>
					</Route>
				</Routes>
				{/* <Toaster /> */}
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	)
}

export default App
