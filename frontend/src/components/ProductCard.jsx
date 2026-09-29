import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition hover:shadow-lg flex flex-col justify-between">
            <div>
                <div className="relative h-56 bg-gray-50 flex items-center justify-center p-4">
                    <img src={product.image} alt={product.name} className="h-full object-contain" />
                    {product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{product.brand}</span>
                    <h3 className="font-bold text-gray-800 text-lg mt-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{product.olfactoryFamily} • {product.sizeMl}ml</p>
                </div>
            </div>
            <div className="p-4 pt-0 flex items-center justify-between mt-2">
                <div>
                    <span className="text-xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
                    {product.previousPrice && (
                        <span className="block text-xs text-gray-400 line-through">{formatPrice(product.previousPrice)}</span>
                    )}
                </div>
                <button 
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                    Comprar
                </button>
            </div>
        </div>
    );
}
