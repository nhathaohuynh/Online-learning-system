import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/app/ThemeProvider'
import Home from './pages/Home'
import RootLayout from './pages/layouts/RootLayout'
import path from './utils/path'

function App() {
	return (
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<BrowserRouter>
				<Routes>
					<Route path={path.ROOT} element={<RootLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
				{/* <Toaster /> */}
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
