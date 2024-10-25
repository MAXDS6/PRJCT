"use client"; // Esto indica que es un Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir a la página de pago

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Producto 1: Linkin Park - Meteora (2003)',
      price: 11500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Linkin_Park_Meteora_Album_Cover.jpg',
      link: 'https://es.wikipedia.org/wiki/Meteora_(%C3%A1lbum)'
    },
    {
      id: 2,
      name: 'Producto 2: System of a Down - Toxicity (2001)',
      price: 15000,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/64/SystemofaDownToxicityalbumcover.jpg',
      link: 'https://es.wikipedia.org/wiki/Toxicity_(album)'
    },
    {
      id: 3,
      name: 'Producto 3: Korn - Issues (1999)',
      price: 12000,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b6/KoRnIssues.jpg',
      link: 'https://es.wikipedia.org/wiki/Issues'
    },
    {
      id: 4,
      name: 'Producto 4: Deftones - White Pony (2001)',
      price: 20000,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/16/Deftones_-_White_Pony-greycoverart.jpg',
      link: 'https://es.wikipedia.org/wiki/White_Pony'
    },
    {
      id: 5,
      name: 'Producto 5: Linkin Park - Hybrid Theory (2000)',
      price: 11500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg',
      link: 'https://es.wikipedia.org/wiki/Hybrid_Theory'
    },
    {
      id: 6,
      name: 'Producto 6: Linkin Park - Hybrid Theory Deluxe (2000)',
      price: 19500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg',
      link: 'https://es.wikipedia.org/wiki/Hybrid_Theory'
    },
    {
      id: 7,
      name: 'Producto 7: Nas - Illmatic (1994)',
      price: 11500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg',
      link: 'https://es.wikipedia.org/wiki/Illmatic'
    },
    {
      id: 8,
      name: 'Producto 8: Darkthrone - Transilvanian Hunger (1994)',
      price: 18500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Darkthrone_-_Transilvanian_Hunger.jpg',
      link: 'https://es.wikipedia.org/wiki/Transilvanian_Hunger'
    }
  ]);

  const [order, setOrder] = useState('desc'); // Controlar el orden ascendente o descendente
  const [sortBy, setSortBy] = useState('price'); // Controlar el criterio de ordenación (precio o id)
  const [cart, setCart] = useState([]); // Estado del carrito

  const router = useRouter(); // Usamos esto para redirigir a la página de pago

  // Función para ordenar los productos
  const sortProducts = () => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        return order === 'asc' ? a.id - b.id : b.id - a.id;
      }
    });
    setProducts(sorted);
    setOrder(order === 'asc' ? 'desc' : 'asc'); // Alterna el orden
  };

  // Función para añadir al carrito
  const addToCart = (product) => {
    setCart([...cart, product]); // Añadir el producto al carrito
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]); // Vaciar el carrito
  };

  // Función para calcular el total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0); // Suma los precios de los productos en el carrito
  };

  // Función para ir a la página de pago
  const goToCheckout = () => {
    router.push('/checkout'); // Redirigir a la página de pago
  };

  return (
    <div className="container">
      <h1>Lista de Discos</h1>
      <div className="controls">
        <label htmlFor="sortBy">Ordenar por:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Precio</option>
          <option value="id">ID</option>
        </select>
        <button onClick={sortProducts}>
          Ordenar por {sortBy} ({order === 'asc' ? 'Decreciente' : 'Ascendente'})
        </button>
      </div>
      
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              Ver más detalles
            </a>
            <br />
            {/* Botón para añadir al carrito */}
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Añadir al carrito</button>
          </div>
        ))}
      </div>

      {/* Mostrar el botón de "Ir a pagar" solo si hay productos en el carrito */}
      {cart.length > 0 && (
        <div className="checkout">
          <h2>Productos en el carrito: {cart.length}</h2>
          <h3>Total: ${getTotalPrice()}</h3> {/* Mostrar el precio total del carrito */}
          <button className="checkout-btn" onClick={goToCheckout}>Ir a la página de pago</button>
          <button className="clear-cart-btn" onClick={clearCart}>Limpiar carrito</button>
        </div>
      )}
    </div>
  );
}
