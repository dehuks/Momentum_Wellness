import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { FiEye, FiX } from "react-icons/fi";
import { blogApi } from "../../lib/blogApi";
import { useBlogAuth } from "../../hooks/useBlogAuth";
import BlogPostView from "../../components/BlogPostView";

const Toolbar = ({ editor, onInsertImage, uploading }) => {
  if (!editor) return null;

  const btn = (isActive) =>
    `px-3 py-1 rounded text-sm font-medium ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
      <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
      <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered List</button>
      <button type="button" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      <button
        type="button"
        className={btn(editor.isActive("link"))}
        onClick={() => {
          const url = window.prompt("Link URL", editor.getAttributes("link").href || "https://");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
          } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }
        }}
      >
        Link
      </button>
      <label className={`${btn(false)} cursor-pointer`}>
        {uploading ? "Uploading..." : "Insert Image"}
        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={onInsertImage} />
      </label>
    </div>
  );
};

const BlogEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useBlogAuth();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
    content: "",
  });

  useEffect(() => {
    if (!isEditing) return;
    blogApi
      .getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setExcerpt(post.excerpt || "");
        setFeaturedImage(post.featured_image || "");
        editor?.commands.setContent(post.content || "");
      })
      .catch((err) => {
        console.error("Error loading post:", err);
        setError("Failed to load post.");
      })
      .finally(() => setLoading(false));
  }, [id, isEditing, editor]);

  const handleFeaturedUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFeatured(true);
    try {
      const url = await blogApi.uploadImage(file);
      setFeaturedImage(url);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploadingFeatured(false);
    }
  };

  const handleInlineUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInline(true);
    try {
      const url = await blogApi.uploadImage(file);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error("Error uploading image:", err);
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploadingInline(false);
    }
  };

  const handleSave = async (status) => {
    if (!title.trim() || editor?.isEmpty) {
      setError("Title and content are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: editor.getHTML(),
      featured_image: featuredImage,
      status,
    };
    try {
      if (isEditing) {
        await blogApi.updatePost(id, payload);
      } else {
        await blogApi.createPost(payload);
      }
      navigate("/admin/blog", { replace: true });
    } catch (err) {
      console.error("Error saving post:", err);
      setError(err.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 md:px-10 py-8">
        <p style={{ color: "var(--text-secondary)" }}>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#134E4A" }}>
        {isEditing ? "Edit Post" : "New Post"}
      </h1>

      <div className="card space-y-4">
        <div>
          <label className="form-label">Title</label>
          <input
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />
        </div>

        <div>
          <label className="form-label">Excerpt</label>
          <textarea
            className="form-textarea form-input"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            disabled={saving}
          />
        </div>

        <div>
          <label className="form-label">Featured Image</label>
          {featuredImage && (
            <img src={featuredImage} alt="Featured" className="w-full h-40 object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" onChange={handleFeaturedUpload} disabled={uploadingFeatured || saving} />
          {uploadingFeatured && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>

        <div>
          <label className="form-label">Content</label>
          <Toolbar editor={editor} onInsertImage={handleInlineUpload} uploading={uploadingInline} />
          <div className="border rounded-lg p-4 min-h-[240px]" style={{ borderColor: "var(--border-color)" }}>
            <EditorContent editor={editor} className="blog-content" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button className="btn-secondary" disabled={saving} onClick={() => handleSave("draft")}>
            Save Draft
          </button>
          <button className="btn-primary" disabled={saving} onClick={() => handleSave("published")}>
            {saving ? "Saving..." : "Publish"}
          </button>
          <button
            type="button"
            className="btn-secondary inline-flex items-center gap-2"
            onClick={() => setPreviewOpen(true)}
          >
            <FiEye className="w-4 h-4" /> Preview
          </button>
          <button type="button" className="btn-secondary ml-auto" onClick={() => navigate("/admin/blog")}>
            Cancel
          </button>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "var(--light-bg)" }}>
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ backgroundColor: "var(--card-bg)", borderBottom: "1px solid var(--border-color)" }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: "#134E4A" }}>Preview</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                This is how the post will look once published — nothing has been saved.
              </p>
            </div>
            <button
              onClick={() => setPreviewOpen(false)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <FiX className="w-4 h-4" /> Close Preview
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-10 py-10">
            <BlogPostView
              animate={false}
              post={{
                title,
                content: editor?.getHTML(),
                featured_image: featuredImage,
                author_name: user?.name || "You",
                published_at: new Date().toISOString(),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
