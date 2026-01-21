import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState("");

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    useEffect(() => {
        // Check session storage for existing auth
        const isAuth = sessionStorage.getItem("admin_auth");
        if (isAuth === "true") {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (inputPassword === ADMIN_PASSWORD) {
            sessionStorage.setItem("admin_auth", "true");
            setIsAuthenticated(true);
        } else {
            setError("Incorrect password");
        }
    };

    if (loading) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={inputPassword}
                                onChange={(e) => {
                                    setInputPassword(e.target.value);
                                    setError("");
                                }}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
