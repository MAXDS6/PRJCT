// pages/index.js
"use client";

import { useState, useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/router';

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

const productImages = {
    1: "https://api.autoplanet.cl/medias/sys_master/images/h03/hbb/9689390415902/19_Sistema-de-Escape/19-Sistema-de-Escape.png",
    2: "https://api.autoplanet.cl/medias/sys_master/images/h00/ha0/9627906605086/1088886_1-1682041641/1088886-1-1682041641.webp",
    3: "https://api.autoplanet.cl/medias/sys_master/images/h30/h37/9742911635486/drp300Wx300H_1145915_1-1718052059/drp300Wx300H-1145915-1-1718052059.webp",
    4: "https://api.autoplanet.cl/medias/sys_master/images/h14/h3a/9637833244702/drp515Wx515H_123007_1-1682041641/drp515Wx515H-123007-1-1682041641.webp",
    5: "https://api.autoplanet.cl/medias/sys_master/images/hec/hf5/9657979699230/drp515Wx515H_1104740_1-1682041641/drp515Wx515H-1104740-1-1682041641.webp",
    6: "https://api.autoplanet.cl/medias/sys_master/images/h3a/h02/9659757068318/1129025_1-1682041641/1129025-1-1682041641.webp",
    7: "https://api.autoplanet.cl/medias/sys_master/images/h1c/h25/9671835648030/1089846_1-1686325795/1089846-1-1686325795.webp",
    8: "https://api.autoplanet.cl/medias/sys_master/images/h41/hcd/9658013843486/drp515Wx515H_1108485_1-1682041641/drp515Wx515H-1108485-1-1682041641.webp",
    9: "https://api.autoplanet.cl/medias/sys_master/images/h52/h09/9636977573918/121733_1-1682041641/121733-1-1682041641.webp"
};

export default function Home() {
    const { addToCart } = useContext(CartContext);
    const [language, setLanguage] = useState('es');
    const router = useRouter();

    const translatePage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const handleCheckout = () => {
        router.push('/checkout');
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
                            src={productImages[id]}
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
            <button onClick={handleCheckout}>Ir al carrito</button>
        </div>
    );
}
