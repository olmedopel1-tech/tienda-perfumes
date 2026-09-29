import React from 'react'
import ReactDOM from 'react-dom/client'
import Checkout from './pages/Checkout.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Checkout />
    </CartProvider>
  </React.StrictMode>,
)
