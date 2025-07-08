
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";  

export default function LoginForm() {
    const [usernameOrEmail, setUsernameOrEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEnglish, setIsEnglish] = useState(false);

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!usernameOrEmail || !password) {
            setError(isEnglish ? "Please fill in all fields." : "Por favor, completa todos los campos.");
            setSuccess("");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernameOrEmail, password }),
            });

            if (res.ok) {
                setSuccess(isEnglish ? "Login successful!" : "¡Inicio de sesión exitoso!");
                setError("");

                // Guardar el nombre de usuario o correo en localStorage
                localStorage.setItem("username", usernameOrEmail);

                // Redirigir a la página principal
                router.push("/");
            } else {
                const data = await res.json();
                setError(data.message || (isEnglish ? "Invalid credentials." : "Credenciales inválidas."));
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
                <h1 className={styles.title}>{isEnglish ? "Login" : "Iniciar sesión"}</h1>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="text"
                        placeholder={isEnglish ? "Username or Email" : "Usuario o Correo electrónico"}
                        className={styles.input}
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={isEnglish ? "Password" : "Contraseña"}
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.button}>
                        {isEnglish ? "Login" : "Iniciar sesión"}
                    </button>
                </form>
                <p className={styles.link}>
                    {isEnglish ? "Don't have an account?" : "¿No tienes una cuenta?"}{" "}
                    <Link href="/register" className={styles.registerLink}>
                        {isEnglish ? "Register" : "Regístrate"}
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
