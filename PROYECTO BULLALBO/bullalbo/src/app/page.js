// pages/index.js
"use client";

import { useState } from 'react';
import Image from 'next/image';

const textContent = {
    es: {
        storeName: "Bullalbo",
        productsTitle: "Productos",
        cartTitle: "Tu carrito de compras",
        clearCart: "Limpiar carrito de compras",
        addToCart: "Añadir al carrito",
        products: {
            1: "Tubo de escape",
            2: "Aceite de motor",
            3: "Neumático",
            4: "Bujías",
            5: "Filtros de aire",
            6: "Filtros de aceite",
            7: "Espejo",
            8: "Focos trasero",
            9: "Correa 5Pk"
        }
    },
    en: {
        storeName: "Bullalbo",
        productsTitle: "Products",
        cartTitle: "Your shopping cart",
        clearCart: "Clear shopping cart",
        addToCart: "Add to cart",
        products: {
            1: "Exhaust Pipe",
            2: "Motor Oil",
            3: "Tire",
            4: "Spark Plugs",
            5: "Air Filter",
            6: "Oil Filter",
            7: "Mirror",
            8: "Back Headlight",
            9: "Car Strap 5PK"
        }
    }
};

export default function Home() {
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);
    const [language, setLanguage] = useState('es');

    const translatePage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const addToCart = (productId, productPrice) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            newCart[productId] = newCart[productId]
                ? { ...newCart[productId], quantity: newCart[productId].quantity + 1 }
                : { id: productId, price: productPrice, quantity: 1 };
            updateTotal(newCart);
            return newCart;
        });
    };

    const updateTotal = (newCart) => {
        const newTotal = Object.values(newCart).reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(newTotal);
    };

    const incrementProduct = (productId) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId].quantity < 5) newCart[productId].quantity++;
            updateTotal(newCart);
            return newCart;
        });
    };

    const decrementProduct = (productId) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId].quantity > 1) newCart[productId].quantity--;
            else delete newCart[productId];
            updateTotal(newCart);
            return newCart;
        });
    };

    const clearCart = () => {
        setCart({});
        setTotal(0);
    };

    return (
        <div className="container">
            <button onClick={translatePage} id="translate-btn">
                {language === 'es' ? 'English' : 'Español'}
            </button>
            <h1>{textContent[language].storeName}</h1>
            <h2>{textContent[language].productsTitle}</h2>
            <div className="products">
                {Object.keys(textContent[language].products).map((id) => (
                    <div key={id} className="product">
                        <Image
                            src={`https://source.unsplash.com/120x120/?product,${id}`}
                            alt={textContent[language].products[id]}
                            width={120}
                            height={120}
                        />
                        <h4>{textContent[language].products[id]}</h4>
                        <p>{id * 1000}$</p>
                        <button
                            onClick={() => addToCart(id, id * 1000)}
                            className="button"
                        >
                            {textContent[language].addToCart}
                        </button>
                    </div>
                ))}
            </div>
            <h3>{textContent[language].cartTitle}</h3>
            <ul id="cart-items">
                {Object.values(cart).map((item) => (
                    <li key={item.id}>
                        {textContent[language].products[item.id]} - {item.quantity} x $
                        {item.price}
                        <button onClick={() => decrementProduct(item.id)} className="button">-</button>
                        <button onClick={() => incrementProduct(item.id)} className="button">+</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={clearCart} id="clear-cart">
                {textContent[language].clearCart}
            </button>
        </div>
    );
}
