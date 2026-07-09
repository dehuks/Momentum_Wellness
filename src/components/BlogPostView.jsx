import React from "react";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiFileText } from "react-icons/fi";
import DOMPurify from "dompurify";

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : null;

const BlogPostView = ({ post, animate = true }) => {
  const Wrapper = animate ? motion.article : "article";
  const motionProps = animate
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }
    : {};

  return (
    <Wrapper
      className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-light)",
      }}
      {...motionProps}
    >
      {post.featured_image ? (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
          decoding="async"
        />
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <FiFileText className="w-10 h-10" style={{ color: "var(--primary)" }} />
        </div>
      )}

      <div className="p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "#134E4A" }}>
          {post.title || "Untitled post"}
        </h1>

        <div
          className="flex items-center gap-4 text-sm mb-8 pb-6"
          style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}
        >
          <span className="flex items-center gap-1.5">
            <FiUser className="w-4 h-4" />
            {post.author_name}
          </span>
          {post.published_at && (
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              {formatDate(post.published_at)}
            </span>
          )}
        </div>

        <div
          className="blog-content"
          style={{ color: "var(--text-primary)" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "<p><em>Nothing written yet.</em></p>") }}
        />
      </div>
    </Wrapper>
  );
};

export default BlogPostView;
