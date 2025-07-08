"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./buy.module.css";

const textContent = { 
  es: {
    storeName: "Bullalbo",
    productsTitle: "Productos",
    cartTitle: "Tu carrito de compras",
    clearCart: "Limpiar carrito de compras",
    addToCart: "Añadir al carrito",
    welcomeMessage: "Hola",
    sellButton: "Vender",
    buyButton: "Comprar",
    logoutButton: "Cerrar Sesión",
    emptyCart: "Tu carrito está vacío",
    confirmTitle: "Confirmar Compra",
    confirmButton: "Confirmar",
    totalToPay: "Total a pagar",
    switchToLanguage: "Cambiar a Inglés",
    backButton: "Volver",
    successMessage: "¡Compra realizada con éxito!",
    products: {
      1: "Tubo de escape",
      2: "Aceite de motor",
      3: "Neumático",
      4: "Bujías",
      5: "Filtros de aire",
      6: "Filtros de aceite",
      7: "Espejo",
      8: "Focos trasero",
      9: "Correa 5Pk",
      10: "Limpiador de Llantas y Neumaticos 500ML FW-L0501",
      11: "Shampoo para Autos Motorlife 2 L",
      12: "Shampoo con Cera para Autos Magic Shine Ecológico 500 ML",
      13: "Aceite de Motor Castrol Edge Sintético 5W30 1L",
      14: "Limpiador Parabrisas MOTORLIFE",
      15: "Cera para Automóvil Crema 200 gr Kit"
    }
  },
  en: {
    storeName: "Bullalbo",
    productsTitle: "Products",
    cartTitle: "Your shopping cart",
    clearCart: "Clear shopping cart",
    addToCart: "Add to cart",
    welcomeMessage: "Hello",
    sellButton: "Sell",
    buyButton: "Buy",
    logoutButton: "Logout",
    emptyCart: "Your cart is empty",
    confirmTitle: "Confirm Purchase",
    confirmButton: "Confirm",
    totalToPay: "Total to pay",
    switchToLanguage: "Switch to Spanish",
    backButton: "Back",
    successMessage: "Purchase completed successfully!",
    products: {
      1: "Exhaust Pipe",
      2: "Motor Oil",
      3: "Tire",
      4: "Spark Plugs",
      5: "Air Filter",
      6: "Oil Filter",
      7: "Mirror",
      8: "Back Headlight",
      9: "Car Strap 5PK",
      10: "Wheel and Tire Cleaner 500ML FW-L0501",
      11: "Car Shampoo Motorlife 2 L",
      12: "Car Shampoo with Wax Magic Shine Eco 500 ML",
      13: "Motor Oil Castrol Edge Synthetic 5W30 1L",
      14: "Windshield Cleaner MOTORLIFE",
      15: "Car Wax Cream 200 gr Kit"
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
  9: "https://api.autoplanet.cl/medias/sys_master/images/h52/h09/9636977573918/121733_1-1682041641/121733-1-1682041641.webp",
  10: "https://api.autoplanet.cl/medias/sys_master/images/hc7/hd7/9875875561502/1136086_1-1739980652/1136086-1-1739980652.webp",
  11: "https://api.autoplanet.cl/medias/sys_master/images/h96/h09/9871526199326/120875_1-1739980652/120875-1-1739980652.webp",
  12: "https://api.autoplanet.cl/medias/sys_master/images/hd0/h09/9875199787038/1024957_1-1739980652/1024957-1-1739980652.webp",
  13: "https://api.autoplanet.cl/medias/sys_master/images/h7c/h0c/9659838726174/1131201_1-1682041641/1131201-1-1682041641.webp",
  14: "https://api.autoplanet.cl/medias/sys_master/images/hce/hac/9871537602590/120914_1-1739980652/120914-1-1739980652.webp",
  15: "https://api.autoplanet.cl/medias/sys_master/images/hda/h67/9874297323550/490271_1-1739980652/490271-1-1739980652.webp"
};

export default function BuyPage() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [isEnglish, setIsEnglish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedTotal = localStorage.getItem("total");
    if (storedCart && storedTotal) {
      setCart(JSON.parse(storedCart));
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  const lang = isEnglish ? "en" : "es";

  const handleConfirmPurchase = async () => {
    const items = Object.values(cart).map(item => ({
      productName: textContent[lang].products[item.id],
      quantity: item.quantity,
      price: item.price
    }));

    await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items, total })
    });

    alert(textContent[lang].successMessage);
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    router.push("/");
  };

  return (
    <div className={styles.pageBg}>
      {/* HEADER AZUL */}
      <header className={styles.header}>
        <span className={styles.brand}>Bullalbo</span>
        <button
          className={styles.languageButtonHeader}
          onClick={() => setIsEnglish(!isEnglish)}
        >
          {lang === "es" ? "English" : "Español"}
        </button>
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>{textContent[lang].confirmTitle}</h1>

        {Object.keys(cart).length > 0 ? (
          <div className={styles.cart}>
            <ul className={styles.cartList}>
              {Object.values(cart).map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <span>{item.quantity} x {textContent[lang].products[item.id]}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className={styles.total}>
              {textContent[lang].totalToPay} ${total}
            </p>

            <button
              onClick={handleConfirmPurchase}
              className={styles.submitButton}
            >
              {textContent[lang].confirmButton}
            </button>
            
            {/* Volver como enlace */}
            <div className={styles.linkBox}>
              <a
                href="/"
                className={styles.backLink}
                onClick={e => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                {textContent[lang].backButton}
              </a>
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>{textContent[lang].emptyCart}</p>
        )}
      </div>
    </div>
  );
}
