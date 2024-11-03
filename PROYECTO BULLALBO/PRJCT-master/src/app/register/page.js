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
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            alert("Registro exitoso");
        } else {
            alert("Error en el registro");
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#5100a3] to-[#ffffff] text-4xl flex flex-col gap-2 align-center justify-center h-screen items-center">
            <h1 className="text-5xl font-bold mb-6">Register Page</h1>
            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-700 mt-4">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
            <Link href="/" className="text-blue-500 hover:underline mt-4">
                Inicio
            </Link>
        </div>
    );
}
