"use client";
import { useState } from "react";
import products from "@/data/products";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = () => {
    const found = products.find(p =>
      input.toLowerCase().includes(p.name.toLowerCase())
    );

    if (found) {
      setResponse(`Encontré "${found.name}" por $${found.price}`);
    } else {
      setResponse("No encontré ese producto. Intenta con otro nombre.");
    }

    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999 }}>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
        }}
      >
        💬
      </button>

      {/* Ventana de chat emergente */}
      {isOpen && (
        <div
          style={{
            width: 300,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "Arial"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Asistente Bullalbo</h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué estás buscando?"
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "6px 12px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            Buscar
          </button>
          {response && (
            <p style={{ marginTop: 10, fontSize: "0.9rem" }}>{response}</p>
          )}
        </div>
      )}
    </div>
  );
}
