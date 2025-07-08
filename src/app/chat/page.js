"use client";
import { useState } from "react";
import products from "@/data/products";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = () => {
    const userInput = input.trim().toLowerCase();
    if (!userInput) {
      setResponse("Por favor, escribe algo para buscar.");
      return;
    }

    const found = products.find((p) => {
      const name = p.name?.toLowerCase() || "";
      const name_en = p.name_en?.toLowerCase() || "";
      return name.includes(userInput) || name_en.includes(userInput);
    });

    if (found) {
      setResponse(`✅ Encontré "${found.name}" (en: "${found.name_en}") por $${found.price}.`);
    } else {
      setResponse("❌ No encontré ese producto. Intenta con otro nombre.");
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>Asistente Bullalbo 🤖</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="¿Qué estás buscando?"
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#0044cc",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>
      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{response}</p>
    </div>
  );
}
