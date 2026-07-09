import React from "react";
import { Navigate } from "react-router-dom";
import { useBlogAuth } from "../hooks/useBlogAuth";

const BlogProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useBlogAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/admin/blog/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/admin/blog" replace />;
    }

    return children;
};

export default BlogProtectedRoute;
