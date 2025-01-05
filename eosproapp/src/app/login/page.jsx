"use client";

import { useState } from "react";
import { login } from "@/services/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clearing previous errors
        setIsLoading(true);
        try {
            await login(email, password);
            alert("Login successful!");
            // Redirecting to dashboard (use router.push if needed)
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        aria-label="Email Address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(""); // Clear error on change
                        }}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(""); // Clear error on change
                        }}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded ${isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                    disabled={isLoading}
                    aria-label="Login"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
