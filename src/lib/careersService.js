const BASE = "/api/blog";

export const careersService = {
    /**
     * Submits a job application (name, email, phone, message + CV, optional cover letter).
     * @param {Object} data - Application data (name, email, phone, message).
     * @param {File} cvFile - The CV file object.
     * @param {File} coverLetterFile - The Cover Letter file object (optional).
     */
    async submitApplication(data, cvFile, coverLetterFile) {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("phone", data.phone || "");
        form.append("message", data.message);
        form.append("cv", cvFile);
        if (coverLetterFile) {
            form.append("cover_letter", coverLetterFile);
        }

        let res;
        try {
            res = await fetch(`${BASE}/careers_submit.php`, { method: "POST", body: form });
        } catch (error) {
            console.error("Network error submitting application:", error);
            throw new Error("Could not reach the server. Check your connection and try again.");
        }

        const responseData = await res.json().catch(() => null);
        if (!res.ok || responseData === null || responseData.success !== true) {
            throw new Error((responseData && responseData.error) || `Request failed (${res.status})`);
        }

        return responseData;
    },

    /**
     * Fetches all job applications (admin/editor only, uses the session cookie).
     * @returns {Promise<Array>} - List of applications.
     */
    async getApplications() {
        let res;
        try {
            res = await fetch(`${BASE}/careers_applications.php`, { credentials: "include" });
        } catch (error) {
            console.error("Network error fetching applications:", error);
            throw new Error("Could not reach the server. Check your connection and try again.");
        }

        const data = await res.json().catch(() => null);
        if (!res.ok || data === null || data.success !== true) {
            throw new Error((data && data.error) || `Request failed (${res.status})`);
        }

        return data.applications;
    },
};
