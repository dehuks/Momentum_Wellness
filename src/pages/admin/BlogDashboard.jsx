import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiUsers } from "react-icons/fi";
import { useBlogAuth } from "../../hooks/useBlogAuth";
import { blogApi } from "../../lib/blogApi";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
      status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    }`}
  >
    {status}
  </span>
);

const BlogDashboard = () => {
  const { user } = useBlogAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadPosts = () => {
    setLoading(true);
    blogApi
      .listMyPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => {
        console.error("Error loading posts:", err);
        setError("Failed to load posts.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadPosts, []);

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    try {
      await blogApi.deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert(err.message || "Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#134E4A" }}>Posts</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {user.role === "author" ? "Posts you've written" : "All posts across every author"}
          </p>
        </div>
        <div className="flex gap-3">
          {user.role === "admin" && (
            <Link to="/admin/blog/users" className="btn-secondary inline-flex items-center gap-2">
              <FiUsers className="w-4 h-4" /> Manage Users
            </Link>
          )}
          <Link to="/admin/blog/new" className="btn-primary inline-flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> New Post
          </Link>
        </div>
      </div>

      {loading && <p style={{ color: "var(--text-secondary)" }}>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        posts.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}
          >
            <p style={{ color: "var(--text-secondary)" }}>No posts yet. Create your first one.</p>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border-color)" }}>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Title</th>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Author</th>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Status</th>
                  <th className="p-4 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Updated</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                    <td className="p-4 font-medium" style={{ color: "var(--text-primary)" }}>{post.title}</td>
                    <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>{post.author_name}</td>
                    <td className="p-4"><StatusBadge status={post.status} /></td>
                    <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {new Date(post.updated_at || post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/admin/blog/${post.id}/edit`} className="text-sm font-medium" style={{ color: "var(--primary)" }}>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post)}
                          disabled={deletingId === post.id}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          {deletingId === post.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default BlogDashboard;
