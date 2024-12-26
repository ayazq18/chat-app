import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CustomThemeProvider } from './context/ThemeContext.jsx'
import { SnackbarProvider } from 'notistack'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <App />
      </SnackbarProvider>
    </CustomThemeProvider>
  </StrictMode>
)
