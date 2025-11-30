import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- API CONFIGURATION START ---
// Toggle for local development vs. production deployment
const IS_LOCAL_DEV = true; // MUST be TRUE for local testing (Kali/PostgreSQL)

// LOCAL DEVELOPMENT API (Python Flask)
const LOCAL_API_URL = "http://localhost:5000/api/blogs";

// PRODUCTION API (Hostafrica cPanel/PHP/MySQL)
// Replace 'https://yourdomain.com' with your actual domain when deploying
const PROD_API_URL = "https://mowet.co.ke/wp-json/wp/v2/posts";

// ---------------------

const PUBLIC_API_URL = IS_LOCAL_DEV ? LOCAL_API_URL : PROD_API_URL;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        // For the public read, we do NOT send the Authorization header.
        // The local Python API handles GET requests without a key.
        const res = await fetch(PUBLIC_API_URL); 

        if (!res.ok) {
          // If the status is not 200 (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! Status: ${res.status}. Check API server.`);
        }

        const data = await res.json();
        
        // Data mapping to handle PostgreSQL snake_case fields (e.g., image_id)
        // Only display posts that are marked as published (is_published = 1 or true).
        const publishedPosts = data.map(post => ({
  id: post.id,
  title: post.title.rendered,
  excerpt: post.excerpt.rendered,
  imageUrl: post.featured_media_url, // optional
}));

        
        setPosts(publishedPosts);

      } catch (err) {
        console.error("Error fetching blogs:", err);
        // Provide a clearer error message for the user
        setError(`Failed to load blog posts. Ensure API (${PUBLIC_API_URL}) is running and accessible.`);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <main className="px-4 md:px-10 lg:px-20 py-12">
        <p className="text-center text-gray-600">Loading posts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-4 md:px-10 lg:px-20 py-12">
        <p className="text-center text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main
      className="px-4 md:px-10 lg:px-20 py-12"
      style={{ backgroundColor: "var(--light-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="section-title">Our Blog</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No blog posts available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id} 
                className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title || "Blog image"}
                    className="w-full h-48 object-cover"
                    // Added a robust image fallback placeholder
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing"; }}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {post.title || "Untitled"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt || "No description available."}
                  </p>
                  <button className="btn-secondary">Read More</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
