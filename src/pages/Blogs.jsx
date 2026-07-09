import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiArrowRight, FiFileText, FiAlertCircle } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import { blogApi } from "../lib/blogApi";

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : null;

const BlogCard = ({ post, index }) => (
  <motion.article
    className="flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
    style={{
      backgroundColor: "var(--card-bg)",
      borderColor: "var(--border-color)",
      boxShadow: "var(--shadow-light)",
    }}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    {post.featured_image ? (
      <img
        src={post.featured_image}
        alt={post.title}
        className="w-full h-48 object-cover"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div
        className="w-full h-48 flex items-center justify-center"
        style={{ background: "var(--gradient-accent)" }}
      >
        <FiFileText className="w-10 h-10" style={{ color: "var(--primary)" }} />
      </div>
    )}

    <div className="flex flex-col flex-1 p-6">
      <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <FiUser className="w-3.5 h-3.5" />
          {post.author_name}
        </span>
        {post.published_at && (
          <span className="flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(post.published_at)}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 leading-snug" style={{ color: "#134E4A" }}>
        {post.title}
      </h3>

      <p className="text-base leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
        {post.excerpt || "No description available."}
      </p>

      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold w-fit transition-colors"
        style={{ color: "var(--primary)" }}
      >
        Read More <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.article>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogApi
      .listPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="px-4 md:px-10 lg:px-20 py-12 min-h-[70vh]" style={{ backgroundColor: "var(--light-bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <SectionTitle>Our Blog</SectionTitle>
          <p className="page-description max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Insights, stories, and expert perspectives on mental health and wellness from the Momentum Wellness team.
          </p>
        </div>

        {loading && (
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] h-96 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            className="max-w-md mx-auto mt-10 rounded-2xl p-8 flex flex-col items-center text-center gap-3"
            style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}
          >
            <FiAlertCircle className="w-8 h-8 text-red-500" />
            <p style={{ color: "var(--text-secondary)" }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          posts.length === 0 ? (
            <div
              className="max-w-md mx-auto mt-10 rounded-2xl p-10 flex flex-col items-center text-center gap-3"
              style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}
            >
              <FiFileText className="w-8 h-8" style={{ color: "var(--primary)" }} />
              <p style={{ color: "var(--text-secondary)" }}>
                No blog posts yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 mt-4">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Blog;
