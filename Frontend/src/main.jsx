import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CoinContextProvider from './Components/Context/coincontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinContextProvider>
    <App />
    </CoinContextProvider>
  </StrictMode>,
)
