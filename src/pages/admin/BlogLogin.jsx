import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useBlogAuth } from "../../hooks/useBlogAuth";

const BlogLogin = () => {
  const { user, loading, login } = useBlogAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (loading) return null;
  if (user) {
    return <Navigate to={location.state?.from || "/admin/blog"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await login(email, password);
      navigate("/admin/blog", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setStatus("error");
      setErrorMessage(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--light-bg)" }}>
      <div className="card w-full max-w-md p-8">
        <h1 className="section-title !text-left mb-6">Blog Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={status === "submitting"}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={status === "submitting"}
            />
          </div>
          {status === "error" && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button type="submit" className="btn-primary w-full" disabled={status === "submitting"}>
            {status === "submitting" ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default BlogLogin;
