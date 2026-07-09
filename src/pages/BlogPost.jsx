import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import BlogPostView from "../components/BlogPostView";
import { blogApi } from "../lib/blogApi";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    blogApi
      .getPostBySlug(slug)
      .then(setPost)
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("This post could not be found.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="px-4 md:px-10 lg:px-20 py-12 min-h-[70vh]" style={{ backgroundColor: "var(--light-bg)" }}>
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-64 rounded-2xl" style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }} />
          <div className="h-8 w-2/3 rounded" style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }} />
          <div className="h-4 w-1/3 rounded" style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }} />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="px-4 md:px-10 lg:px-20 py-12 min-h-[70vh] flex items-center justify-center" style={{ backgroundColor: "var(--light-bg)" }}>
        <div
          className="max-w-md w-full rounded-2xl p-10 flex flex-col items-center text-center gap-4"
          style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}
        >
          <FiAlertCircle className="w-8 h-8 text-red-500" />
          <p style={{ color: "var(--text-secondary)" }}>{error}</p>
          <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-10 lg:px-20 py-12" style={{ backgroundColor: "var(--light-bg)" }}>
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: "var(--primary)" }}
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      <BlogPostView post={post} />

      <div className="max-w-3xl mx-auto mt-8 text-center">
        <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
          <FiArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    </main>
  );
};

export default BlogPost;
