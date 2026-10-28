import React, { useEffect, useState } from "react";
import { FiRotateCcw, FiUploadCloud, FiPlus, FiTrash2 } from "react-icons/fi";
import { blogApi } from "../../lib/blogApi";
import { services } from "../../data/services";

const SERVICE_SLOTS = services.map((s) => ({ key: s.key, label: s.title, default: s.image }));

const GallerySection = ({ serviceKey }) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [captionDraft, setCaptionDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    blogApi
      .getServiceGallery(serviceKey)
      .then(setGallery)
      .catch((err) => console.error("Error loading gallery:", err))
      .finally(() => setLoading(false));
  };

  useEffect(load, [serviceKey]);

  const handleAdd = async (file) => {
    if (!file) return;
    setAdding(true);
    setError("");
    try {
      const url = await blogApi.uploadImage(file);
      await blogApi.addServiceGalleryImage(serviceKey, url, captionDraft.trim());
      setCaptionDraft("");
      load();
    } catch (err) {
      console.error("Error adding gallery image:", err);
      setError(err.message || "Failed to add photo.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    setBusyId(id);
    setError("");
    try {
      await blogApi.deleteServiceGalleryImage(id);
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting gallery image:", err);
      setError(err.message || "Failed to remove photo.");
    } finally {
      setBusyId(null);
    }
  };

  const handleCaptionBlur = async (item, newCaption) => {
    if (newCaption === (item.caption || "")) return;
    try {
      await blogApi.updateServiceGalleryCaption(item.id, newCaption);
      setGallery((prev) => prev.map((g) => (g.id === item.id ? { ...g, caption: newCaption } : g)));
    } catch (err) {
      console.error("Error updating caption:", err);
      setError(err.message || "Failed to update caption.");
    }
  };

  return (
    <div className="pt-4 mt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
        Learn More Gallery
      </p>

      {loading ? (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Loading...</p>
      ) : (
        <div className="space-y-2 mb-3">
          {gallery.length === 0 && (
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              No extra photos yet - shown on the service's "Learn More" page.
            </p>
          )}
          {gallery.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <img
                src={item.image_url}
                alt={item.caption || "Gallery photo"}
                className="w-12 h-12 object-cover object-top rounded-lg flex-shrink-0"
              />
              <input
                type="text"
                defaultValue={item.caption || ""}
                placeholder="Caption"
                disabled={busyId === item.id}
                onBlur={(e) => handleCaptionBlur(item, e.target.value.trim())}
                className="form-input flex-1"
                style={{ padding: ".4rem .6rem", fontSize: ".8rem" }}
              />
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={busyId === item.id}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 flex-shrink-0"
                aria-label="Remove photo"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Caption for next photo (optional)"
          value={captionDraft}
          onChange={(e) => setCaptionDraft(e.target.value)}
          className="form-input"
          style={{ padding: ".4rem .6rem", fontSize: ".8rem" }}
        />
        <label
          className={`btn-secondary inline-flex items-center justify-center gap-2 cursor-pointer ${adding ? "opacity-60 pointer-events-none" : ""}`}
          style={{ fontSize: ".8rem", padding: ".4rem .75rem", height: "auto" }}
        >
          <FiPlus className="w-3.5 h-3.5" />
          {adding ? "Adding..." : "Add Photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={adding}
            onChange={(e) => handleAdd(e.target.files?.[0])}
          />
        </label>
      </div>
    </div>
  );
};

const SiteContent = () => {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    blogApi
      .getSiteImages()
      .then(setOverrides)
      .catch((err) => {
        console.error("Error loading site images:", err);
        setError("Failed to load current images.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpload = async (slot, file) => {
    if (!file) return;
    setBusyKey(slot.key);
    setError("");
    try {
      const url = await blogApi.uploadImage(file);
      await blogApi.setSiteImage(slot.key, url);
      setOverrides((prev) => ({ ...prev, [slot.key]: url }));
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setBusyKey(null);
    }
  };

  const handleReset = async (slot) => {
    setBusyKey(slot.key);
    setError("");
    try {
      await blogApi.resetSiteImage(slot.key);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[slot.key];
        return next;
      });
    } catch (err) {
      console.error("Error resetting image:", err);
      setError(err.message || "Failed to reset image.");
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#134E4A" }}>Site Content</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage each service's card photo and the extra photos (with captions) shown on its "Learn More" page.
          Changes go live immediately.
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICE_SLOTS.map((slot) => {
            const isCustom = Boolean(overrides[slot.key]);
            const isBusy = busyKey === slot.key;
            return (
              <div key={slot.key} className="card">
                <img
                  src={overrides[slot.key] || slot.default}
                  alt={slot.label}
                  className="w-full h-40 object-cover object-top rounded-lg mb-3"
                />
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{slot.label}</p>
                  {isCustom && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      Custom
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <label className={`btn-secondary inline-flex items-center gap-2 cursor-pointer ${isBusy ? "opacity-60 pointer-events-none" : ""}`}>
                    <FiUploadCloud className="w-4 h-4" />
                    {isBusy ? "Uploading..." : "Replace Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isBusy}
                      onChange={(e) => handleUpload(slot, e.target.files?.[0])}
                    />
                  </label>
                  {isCustom && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: "var(--text-secondary)" }}
                      disabled={isBusy}
                      onClick={() => handleReset(slot)}
                    >
                      <FiRotateCcw className="w-3.5 h-3.5" /> Reset to default
                    </button>
                  )}
                </div>

                <GallerySection serviceKey={slot.key} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SiteContent;
