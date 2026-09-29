import API_URL from '../api';
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export default function Checkout() {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const [customer, setCustomer] = useState({
        name: '', surname: '', email: '', phone: '', address: '', city: '', state: '', zipCode: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('El carrito está vacío');

        setLoading(true);
        try {
            // Llamamos a nuestro backend de forma segura (sin exponer tokens de MP en el navegador)
            const response = await fetch(`${API_URL}/payments/create_preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
                    customerData: customer
                })
            });

            const data = await response.json();
            if (data.preferenceId) {
                // Redirigimos al usuario al Checkout Pro oficial de Mercado Pago
                window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.preferenceId}`;
            } else {
                alert('Hubo un error al iniciar el pago.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor de pagos.');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Finalizar Compra</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handlePayment} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Tus Datos de Envío</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Nombre" required onChange={handleChange} className="border p-2 rounded w-full" />
                        <input type="text" name="surname" placeholder="Apellido" required onChange={handleChange} className="border p-2 rounded w-full" />
                    </div>
                    <input type="email" name="email" placeholder="Correo Electrónico" required onChange={handleChange} className="border p-2 rounded w-full" />
                    <input type="tel" name="phone" placeholder="Celular / WhatsApp (Ej: 1123456789)" required onChange={handleChange} className="border p-2 rounded w-full" />
                    <input type="text" name="address" placeholder="Dirección (Calle y número)" required onChange={handleChange} className="border p-2 rounded w-full" />
                    <div className="grid grid-cols-3 gap-2">
                        <input type="text" name="city" placeholder="Ciudad" required onChange={handleChange} className="border p-2 rounded w-full" />
                        <input type="text" name="state" placeholder="Provincia" required onChange={handleChange} className="border p-2 rounded w-full" />
                        <input type="text" name="zipCode" placeholder="C. Postal" required onChange={handleChange} className="border p-2 rounded w-full" />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                        {loading ? 'Generando pago...' : 'Pagar con Mercado Pago'}
                    </button>
                </form>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Pedido</h2>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-3 text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total a Pagar:</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
