import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/app/ThemeProvider'
import Home from './pages/Home'
import Profile from './pages/Profile'
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
				</Routes>
				{/* <Toaster /> */}
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	)
}

export default App
