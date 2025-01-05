"use client";

import { useState } from "react";
import { createUser } from "@/services/auth";

export default function AdminPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddUser = async () => {
        if (!email || !password) {
            setMessage("Please provide both email and password.");
            return;
        }

        setIsLoading(true);
        setMessage(""); // Clear previous messages
        try {
            await createUser(email, password);
            setMessage("User added successfully!");
            setEmail(""); // Clear input fields after success
            setPassword("");
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <div className="mb-4 w-full max-w-md">
                <label htmlFor="email" className="block mb-1 text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    aria-label="Email Address"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setMessage(""); // Clear message on input change
                    }}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <div className="mb-4 w-full max-w-md">
                <label htmlFor="password" className="block mb-1 text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setMessage(""); // Clear message on input change
                    }}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <button
                onClick={handleAddUser}
                disabled={isLoading}
                className={`w-full max-w-md py-2 rounded ${isLoading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                aria-label="Add User"
            >
                {isLoading ? "Adding User..." : "Add User"}
            </button>
            {message && (
                <p
                    className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
