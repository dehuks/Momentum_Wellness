const BASE = "/api/blog";

async function request(path, options = {}) {
    const isMutating = (options.method || "GET") !== "GET";
    const headers = { ...(options.headers || {}) };

    if (isMutating) {
        headers["X-Requested-With"] = "XMLHttpRequest";
    }

    let res;
    try {
        res = await fetch(`${BASE}/${path}`, {
            ...options,
            headers,
            credentials: "include",
        });
    } catch (error) {
        console.error(`Network error calling ${path}:`, error);
        throw new Error("Could not reach the server. Check your connection and try again.");
    }

    // A silent redirect landing somewhere other than our own API (e.g. a
    // misconfigured server routing the request elsewhere) is never valid for
    // this endpoint - treat it as a hard failure rather than parsing whatever
    // HTML came back.
    if (res.redirected && !res.url.includes(BASE)) {
        console.error(`Unexpected redirect calling ${path}: landed on ${res.url}`);
        throw new Error("The server sent back something unexpected. Please try again shortly.");
    }

    const data = await res.json().catch(() => null);

    if (!res.ok || data === null || data.success !== true) {
        throw new Error((data && data.error) || `Request failed (${res.status})`);
    }

    return data;
}

function jsonRequest(path, method, body) {
    return request(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

export const blogApi = {
    // --- Auth ---
    async login(email, password) {
        const data = await jsonRequest("login.php", "POST", { email, password });
        return data.user;
    },

    async logout() {
        await request("logout.php", { method: "POST" });
    },

    async me() {
        try {
            const data = await request("me.php");
            return data.user;
        } catch {
            return null;
        }
    },

    // --- Public posts ---
    async listPosts({ page = 1, pageSize = 12 } = {}) {
        const data = await request(`posts.php?status=published&page=${page}&page_size=${pageSize}`);
        return data;
    },

    async getPostBySlug(slug) {
        const data = await request(`posts.php?slug=${encodeURIComponent(slug)}`);
        return data.post;
    },

    // --- Admin posts ---
    async getPostById(id) {
        const data = await request(`posts.php?id=${id}`);
        return data.post;
    },

    async listMyPosts({ page = 1, pageSize = 20 } = {}) {
        const data = await request(`posts.php?all=1&page=${page}&page_size=${pageSize}`);
        return data;
    },

    async createPost(post) {
        return jsonRequest("post_create.php", "POST", post);
    },

    async updatePost(id, post) {
        return jsonRequest("post_update.php", "POST", { id, ...post });
    },

    async deletePost(id) {
        return jsonRequest("post_delete.php", "POST", { id });
    },

    async uploadImage(file) {
        const maxBytes = 10 * 1024 * 1024;
        if (file.size > maxBytes) {
            const mb = (file.size / (1024 * 1024)).toFixed(1);
            throw new Error(`That image is ${mb}MB - please use one under 10MB.`);
        }
        const form = new FormData();
        form.append("image", file);
        const data = await request("upload.php", { method: "POST", body: form });
        return data.url;
    },

    // --- Admin users (admin role only) ---
    async listUsers() {
        const data = await request("users.php");
        return data.users;
    },

    async createUser(user) {
        return jsonRequest("users.php", "POST", user);
    },

    async updateUser(id, updates) {
        return jsonRequest("users.php", "PUT", { id, ...updates });
    },

    async deleteUser(id) {
        return request(`users.php?id=${id}`, { method: "DELETE" });
    },

    // --- Site content (public read, admin write) ---
    async getSiteImages() {
        const data = await request("site_images.php");
        return data.images;
    },

    async setSiteImage(key, imageUrl) {
        return jsonRequest("site_images.php", "POST", { key, image_url: imageUrl });
    },

    async resetSiteImage(key) {
        return request(`site_images.php?key=${encodeURIComponent(key)}`, { method: "DELETE" });
    },

    // --- Service "Learn More" gallery (public read, admin write) ---
    async getServiceGallery(key) {
        const data = await request(`service_gallery.php?key=${encodeURIComponent(key)}`);
        return data.images;
    },

    async addServiceGalleryImage(serviceKey, imageUrl, caption) {
        return jsonRequest("service_gallery.php", "POST", { service_key: serviceKey, image_url: imageUrl, caption });
    },

    async updateServiceGalleryCaption(id, caption) {
        return jsonRequest("service_gallery.php", "PUT", { id, caption });
    },

    async deleteServiceGalleryImage(id) {
        return request(`service_gallery.php?id=${id}`, { method: "DELETE" });
    },
};
