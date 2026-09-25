import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/quicksand/index.css'
import '@fontsource-variable/fredoka/index.css'
import '@fontsource/righteous/latin-400.css'
import './styles/globals.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
