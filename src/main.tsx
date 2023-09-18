// Main entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppThemeProvider from './context/ThemeProvider.tsx'
import ReduxProvider from './store/provider.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReduxProvider>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </ReduxProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
