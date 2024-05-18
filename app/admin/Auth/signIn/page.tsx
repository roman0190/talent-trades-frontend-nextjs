"use client";
import axios from "axios";
import React, { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/admin/login",
                {
                    email,
                    password,
                }
            );

            const { access_token } = response.data;

            if (access_token) {
                sessionStorage.setItem("Token", access_token);
                window.location.href = "/profile";
            } else {
                setError("Login failed");
            }
        } catch (error) {
            setError("Invalid User");
        }
    };

    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <div className="bg-gray-200/40 p-8 rounded-lg shadow-md">
                <h1 className="text-black text-3xl font-semibold mb-6 text-center">
                    Sign In
                </h1>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSignIn}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Sign In
                    </button>
                    {error && (
                        <p className="text-red-500 mt-2 text-center">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
