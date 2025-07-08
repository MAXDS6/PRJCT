// src/app/stats/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './stats.module.css';

const textContent = {
  es: {
    title: "Estadísticas de la página",
    userCount: "Usuarios registrados",
    totalProducts: "Artículos comprados",
    totalRevenue: "Total recaudado",
    switchToLanguage: "Cambiar a Inglés",
    backToHome: "Volver al inicio",
    purchasedItemsTitle: "Detalle de artículos comprados",
    productName: "Producto",
    productQuantity: "Cantidad total",
    productAmount: "Monto total"
  },
  en: {
    title: "Website Statistics",
    userCount: "Registered users",
    totalProducts: "Products purchased",
    totalRevenue: "Total earnings",
    switchToLanguage: "Switch to Spanish",
    backToHome: "Back to Home",
    purchasedItemsTitle: "Purchased Items Detail",
    productName: "Product",
    productQuantity: "Total Quantity",
    productAmount: "Total Amount"
  }
};

export default function StatsPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const lang = isEnglish ? "en" : "es";

  const [userCount, setUserCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [purchasesDetail, setPurchasesDetail] = useState([]);

  useEffect(() => {
    // Verificar usuario admin
    const username = localStorage.getItem("username");
    if (username !== "admin") {
      // Si no es admin, redirigir a inicio
      router.push("/");
      return;
    }

    async function fetchStats() {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setUserCount(data.userCount);
        setTotalProducts(data.totalProducts);
        setTotalRevenue(data.totalRevenue);
        setPurchasesDetail(data.purchasesDetail || []);
      }
    }
    fetchStats();
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{textContent[lang].title}</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{userCount}</div>
          <div className={styles.statLabel}>{textContent[lang].userCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalProducts}</div>
          <div className={styles.statLabel}>{textContent[lang].totalProducts}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>${totalRevenue}</div>
          <div className={styles.statLabel}>{textContent[lang].totalRevenue}</div>
        </div>
      </div>

      {/* Lista de artículos comprados */}
      {purchasesDetail.length > 0 && (
        <>
          <h2 className={styles.purchasedItemsTitle}>{textContent[lang].purchasedItemsTitle}</h2>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>{textContent[lang].productName}</th>
                <th>{textContent[lang].productQuantity}</th>
                <th>{textContent[lang].productAmount}</th>
              </tr>
            </thead>
            <tbody>
              {purchasesDetail.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.totalQuantity}</td>
                  <td>${item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.languageButton}
          onClick={() => setIsEnglish(!isEnglish)}
        >
          {textContent[lang].switchToLanguage}
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/")}
        >
          {textContent[lang].backToHome}
        </button>
      </div>
    </div>
  );
}
