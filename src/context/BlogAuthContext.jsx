import React, { useEffect, useState } from "react";
import { blogApi } from "../lib/blogApi";
import { BlogAuthContext } from "./blogAuthContextObject";

export function BlogAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        blogApi.me().then((u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    const login = async (email, password) => {
        const u = await blogApi.login(email, password);
        setUser(u);
        return u;
    };

    const logout = async () => {
        await blogApi.logout();
        setUser(null);
    };

    return (
        <BlogAuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </BlogAuthContext.Provider>
    );
}
