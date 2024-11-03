"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            localStorage.setItem("username", username); // Guardamos el nombre de usuario en localStorage solo si la autenticación es exitosa
            alert("Entraste");
            router.push("/"); // Redirige a la página principal
        } else {
            alert("No entraste");
        }
    }

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-between h-[500px]">
                <div>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Inicia Sesión</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Usuario</label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                                type="text"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-medium mb-2">Contraseña</label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <p className="text-gray-700">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Regístrate
                        </Link>
                    </p>
                    <Link href="/">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300">
                            Volver al Inicio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
