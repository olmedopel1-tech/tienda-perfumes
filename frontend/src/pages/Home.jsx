import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Un listado de ejemplo con tus perfumes
const perfumesList = [
  { id: 1, name: 'Perfume Árabe Imperial', price: 25000, description: 'Notas amaderadas y especiadas' },
  { id: 2, name: 'Esencia de Ushuaia', price: 22000, description: 'Frescura y notas cítricas' },
  { id: 3, name: 'Oasis Nocturno', price: 30000, description: 'Intenso, ámbar y vainilla' },
];

export default function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Nuestra Tienda de Perfumes</h1>
      <p>Elegí tu fragancia favorita y sumala al carrito.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {perfumesList.map((perfume) => (
          <div key={perfume.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{perfume.name}</h3>
            <p>{perfume.description}</p>
            <p style={{ fontWeight: 'bold' }}>${perfume.price.toLocaleString()}</p>
            <button 
              onClick={() => addToCart(perfume)}
              style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
