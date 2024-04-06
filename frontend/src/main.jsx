import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import '../app/globals.css'
import App from './App.jsx'
import { ThemeProvider } from './components/app/ThemeProvider'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>,
)
