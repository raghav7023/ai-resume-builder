// main.jsx - React app ka entry point
// Ye file React ko HTML se connect karti hai

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 'root' div ko pakdo (index.html mein hai) aur React render karo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
