import React, { useEffect, useState } from "react";
import { FiRotateCcw, FiUploadCloud } from "react-icons/fi";
import { blogApi } from "../../lib/blogApi";
import { services } from "../../data/services";

const SERVICE_SLOTS = services.map((s) => ({ key: s.key, label: s.title, default: s.image }));

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
          Replace the photo shown for each service card on the public Services page. Changes go live immediately.
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SiteContent;
