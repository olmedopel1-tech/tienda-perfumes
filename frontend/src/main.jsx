import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Home />
    </CartProvider>
  </React.StrictMode>,
)
