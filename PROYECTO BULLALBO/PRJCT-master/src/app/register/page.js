"use client";
import Link from "next/link";
import { useState } from "react";
import bcrypt from 'bcryptjs';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
<<<<<<< HEAD
        console.log(res);
        if (res.ok) {
            alert('Registro exitoso');
        } else {
            alert('Error en el registro');
        }
    }

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-between h-[500px]">
                <div>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Regístrate</h1>
                    <form onSubmit={handleRegister} className="space-y-6">
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
                            <p className="text-gray-500 text-sm italic mt-2">Usa una contraseña segura.</p>
                        </div>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            type="submit"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
                <div className="flex justify-between items-center mt-8">
                    <p className="text-gray-700">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                    <Link href="/">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300">
                            Volver al Inicio
                        </button>
                    </Link>
                </div>
            </div>
=======
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="bg-gradient-to-b from-[#5100a3] to-[#ffffff] text-4xl flex flex-col gap-2 align-center justify-center h-screen items-center">
            Register Page
            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <Link href="/">
                Inicio
            </Link>
>>>>>>> fa9248ca983a86d1de6a98f64a0c97a5edd1614e
        </div>
    );
}
