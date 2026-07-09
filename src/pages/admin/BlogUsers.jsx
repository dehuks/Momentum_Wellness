import React, { useEffect, useState } from "react";
import { useBlogAuth } from "../../hooks/useBlogAuth";
import { blogApi } from "../../lib/blogApi";

const emptyForm = { name: "", email: "", password: "", role: "author" };

const BlogUsers = () => {
  const { user: currentUser } = useBlogAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUsers = () => {
    setLoading(true);
    blogApi
      .listUsers()
      .then(setUsers)
      .catch((err) => console.error("Error loading users:", err))
      .finally(() => setLoading(false));
  };

  useEffect(loadUsers, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await blogApi.createUser(form);
      setForm(emptyForm);
      setStatus("success");
      loadUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to create user.");
    }
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Remove ${u.name} (${u.email})?`)) return;
    try {
      await blogApi.deleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.message || "Failed to delete user.");
    }
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#134E4A" }}>Users</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage who can write and publish blog posts.
        </p>
      </div>

      <div className="card mb-8">
          <h2 className="font-bold text-lg mb-4">Add Author or Editor</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Name</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                minLength={8}
                required
              />
            </div>
            <div>
              <label className="form-label">Role</label>
              <select
                className="form-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="author">Author</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {status === "error" && (
              <p className="text-red-500 text-sm md:col-span-2">{errorMessage}</p>
            )}
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Loading users...</p>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border-color)" }}>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Name</th>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Email</th>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Role</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                    <td className="p-4" style={{ color: "var(--text-primary)" }}>{u.name}</td>
                    <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                    <td className="p-4 capitalize" style={{ color: "var(--text-primary)" }}>{u.role}</td>
                    <td className="p-4">
                      {u.id !== currentUser.id && (
                        <button onClick={() => handleDelete(u)} className="text-red-600 hover:underline">
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default BlogUsers;
