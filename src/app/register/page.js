"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";

export default function Register() {
    const [email, setEmail] = useState("");  // Estado para el correo electrónico
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEnglish, setIsEnglish] = useState(false); // Estado para el cambio de idioma

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !username || !password || !confirmPassword) {
            setError(isEnglish ? "Please fill in all fields." : "Por favor, completa todos los campos.");
            setSuccess("");
            return;
        }

        // Validación de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(isEnglish ? "Please enter a valid email address." : "Por favor, ingresa un correo electrónico válido.");
            setSuccess("");
            return;
        }

        if (password !== confirmPassword) {
            setError(isEnglish ? "Passwords do not match." : "Las contraseñas no coinciden.");
            setSuccess("");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (res.ok) {
                setSuccess(isEnglish ? "Registration successful!" : "¡Registro exitoso!");
                setError("");
            } else {
                const data = await res.json();
                setError(data.message || (isEnglish ? "Error during registration." : "Error al registrar usuario."));
                setSuccess("");
            }
        } catch (error) {
            setError(isEnglish ? "Error connecting to the server." : "Hubo un error al conectar con el servidor.");
            setSuccess("");
        }
    };

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h1 className={styles.title}>{isEnglish ? "Register" : "Registrarse"}</h1>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <form onSubmit={handleRegister} className={styles.form}>
                    <input
                        type="text"
                        placeholder={isEnglish ? "Email" : "Correo electrónico"}
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={isEnglish ? "Username" : "Usuario"}
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={isEnglish ? "Password" : "Contraseña"}
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={isEnglish ? "Confirm Password" : "Confirma tu contraseña"}
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.button}>
                        {isEnglish ? "Register" : "Registrarse"}
                    </button>
                </form>
                <p className={styles.link}>
                    {isEnglish ? "Already have an account?" : "¿Ya tienes una cuenta?"}{" "}
                    <Link href="/login" className={styles.registerLink}>
                        {isEnglish ? "Log In" : "Inicia sesión"}
                    </Link>
                </p>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={styles.languageButton}
                        onClick={toggleLanguage}
                    >
                        {isEnglish ? "Switch to Spanish" : "Cambiar a Inglés"}
                    </button>
                    <Link href="/">
                        <button type="button" className={styles.backButton}>
                            {isEnglish ? "Back to Home" : "Volver al inicio"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
