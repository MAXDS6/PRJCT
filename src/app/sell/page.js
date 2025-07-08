"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './sell.module.css';

export default function SellPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEnglish, setIsEnglish] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!photo || !name || !price) {
      setErrorMessage(isEnglish ? "Please fill all fields." : "Por favor, rellena todos los campos.");
      return;
    }

    if (isNaN(price)) {
      setErrorMessage(isEnglish ? "Price must be a number." : "El precio debe ser un número.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("price", price);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData
    });

    try {
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || (isEnglish ? "There was an error uploading the product." : "Hubo un error al subir el producto."));
        return;
      }

      // Si todo va bien, limpiamos el formulario y mostramos mensaje de éxito
      setPhoto(null);
      setName("");
      setPrice("");
      setSuccessMessage(isEnglish ? "Product uploaded successfully!" : "¡Producto subido con éxito!");
    } catch (err) {
      console.error("Error parsing response:", err);
      setErrorMessage(isEnglish ? "Unexpected error." : "Error inesperado.");
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>
        {isEnglish ? "Upload a product" : "Subir un producto"}
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="photo">
          {isEnglish ? "Product Photo:" : "Foto del producto:"}
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <label htmlFor="name">
          {isEnglish ? "Product name:" : "Nombre del producto:"}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="price">
          {isEnglish ? "Price (CLP):" : "Precio (CLP):"}
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}
        <button type="submit" className={styles.submitButton}>
          {isEnglish ? "Upload product" : "Subir producto"}
        </button>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.languageButton}
            onClick={() => setIsEnglish(!isEnglish)}
          >
            {isEnglish ? "Switch to Spanish" : "Cambiar a Inglés"}
          </button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push("/")}
          >
            {isEnglish ? "Back to Home" : "Volver al inicio"}
          </button>
        </div>
      </form>
    </div>
  );
}
