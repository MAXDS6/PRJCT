"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./home.module.css";
import FloatingChat from "@/components/FloatingChat";

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
    statsButton: "Ver Estadísticas",
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
      11: "Pastillas de freno",
      12: "Amortiguadores",
      13: "Radiador",
      14: "Batería",
      15: "Cables de bujía"
    },
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
    statsButton: "View Statistics",
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
      11: "Brake Pads",
      12: "Shock Absorbers",
      13: "Radiator",
      14: "Battery",
      15: "Spark Plug Wires"
    },
  },
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
  11: "https://api.autoplanet.cl/medias/sys_master/images/h7e/h9a/9725570318366/1157918_1-1710770055/1157918-1-1710770055.webp",
  12: "https://imagenes.mundorepuestos.com:9091/FOTOGRAFIAS_B2C/producto/200webp/P021682A.webp",
  13: "https://imagenes.mundorepuestos.com:9091/FOTOGRAFIAS_B2C/producto/200webp/0014833A.webp",
  14: "https://imagenes.mundorepuestos.com:9091/FOTOGRAFIAS_B2C/producto/200webp/9961342A.webp",
  15: "https://imagenes.mundorepuestos.com:9091/FOTOGRAFIAS_B2C/producto/200webp/0031991A.webp"
};

const productPrices = {
  1: 35000,
  2: 18000,
  3: 45000,
  4: 9500,
  5: 12000,
  6: 11000,
  7: 20000,
  8: 15000,
  9: 8000,
  10: 10000,
  11: 22000,
  12: 30000,
  13: 27000,
  14: 55000,
  15: 9000
};

export default function Home() {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [language, setLanguage] = useState("es");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null);
    router.push("/");
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
  const increaseQuantity = (productId) => {
  setCart((prevCart) => {
    const newCart = { ...prevCart };
    if (newCart[productId]) {
      newCart[productId].quantity += 1;
    }
    updateTotal(newCart);
    return newCart;
  });
};

const decreaseQuantity = (productId) => {
  setCart((prevCart) => {
    const newCart = { ...prevCart };
    if (newCart[productId]) {
      if (newCart[productId].quantity > 1) {
        newCart[productId].quantity -= 1;
      } else {
        delete newCart[productId];
      }
    }
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

  const clearCart = () => {
    setCart({});
    setTotal(0);
  };

  const handleBuy = () => {
    if (Object.keys(cart).length === 0) return;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toString());
    router.push("/buy");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{textContent[language].storeName}</h1>
        <div className={styles.nav}>
          <button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className={styles.navButton}
          >
            {language === "es" ? "English" : "Español"}
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className={`${styles.navButton} text-red-500`}
            >
              {textContent[language].logoutButton}
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={styles.navButton}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {user && (
        <div className={styles.welcomeMessage}>
          <h2>
            {textContent[language].welcomeMessage},{" "}
            <span className={styles.username}>{user}</span>!
          </h2>
        </div>
      )}

      {/* Botón para ver estadísticas solo si el usuario es "admin" */}
      {user === "admin" && (
        <div className={styles.statsButtonContainer}>
          <button
            onClick={() => router.push("/stats")}
            className={styles.statsButton}
          >
            {textContent[language].statsButton}
          </button>
        </div>
      )}


      <main>
        <h2 className={styles.productsTitle}>
          {textContent[language].productsTitle}
        </h2>
        <div className={styles.productsGrid}>
          {textContent[language].products &&
            Object.keys(textContent[language].products).map((id) => (
              <div key={id} className={styles.productCard}>
                <Image
                  src={productImages[id]}
                  alt={textContent[language].products[id]}
                  width={150}
                  height={150}
                />
                <h4>{textContent[language].products[id]}</h4>
                <p>Precio: ${productPrices[id]}</p>
                <button
                  onClick={() => addToCart(id, productPrices[id])}
                  className={styles.addToCartButton}
                >
                  {textContent[language].addToCart}
                </button>
              </div>
            ))}
        </div>
        
        {/* Botón flotante para vender */}
          {user && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => router.push("/sell")}
                className={styles.sellButton}
              >
                {textContent[language].sellButton}
              </button>
            </div>
          )}
        <section className={styles.cartSection}>
          <h3>{textContent[language].cartTitle}</h3>
          {Object.keys(cart).length === 0 ? (
            <p>{textContent[language].emptyCart}</p>
          ) : (
            <div>
              {Object.values(cart).map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <span>{textContent[language].products[item.id]}</span>
                  <div className={styles.quantityControls}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <span>Precio: ${item.price * item.quantity}</span>
                </div>
              ))}

              <div className={styles.cartTotal}>
                Total: ${total}
              </div>
              <button
                onClick={clearCart}
                className={`${styles.clearCartButton} text-red-600`}
              >
                {textContent[language].clearCart}
              </button>
              <button onClick={handleBuy} className={styles.buyButton}>
                {textContent[language].buyButton}
              </button>
            </div>
          )}
        </section>
      </main>
      <FloatingChat />
    </div>
  );
}
