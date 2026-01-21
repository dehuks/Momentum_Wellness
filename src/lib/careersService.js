import { ID } from "appwrite";
import { databases, storage } from "./appwrite";
import { appwriteConfig } from "./config";

export const careersService = {
    /**
     * Uploads a file to the Appwrite Bucket.
     * @param {File} file - The file object to upload.
     * @returns {Promise<string>} - The ID of the uploaded file.
     */
    async uploadFile(file) {
        if (!appwriteConfig.bucketId) {
            throw new Error("Appwrite Bucket ID is missing in configuration.");
        }
        try {
            const response = await storage.createFile(
                appwriteConfig.bucketId,
                ID.unique(),
                file
            );
            return response.$id;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    },

    /**
     * Submits a job application.
     * @param {Object} data - Application data (name, email, phone, message).
     * @param {File} cvFile - The CV file object.
     * @param {File} coverLetterFile - The Cover Letter file object (optional).
     * @returns {Promise<Object>} - The created document.
     */
    async submitApplication(data, cvFile, coverLetterFile) {
        if (!appwriteConfig.databaseId || !appwriteConfig.collectionId) {
            throw new Error("Appwrite Database or Collection ID is missing in configuration.");
        }

        try {
            // 1. Upload CV (Required)
            const cvFileId = await this.uploadFile(cvFile);

            // 2. Upload Cover Letter (Optional)
            let coverLetterFileId = null;
            if (coverLetterFile) {
                coverLetterFileId = await this.uploadFile(coverLetterFile);
            }

            // 3. Create Database Record
            const documentData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                cvField: cvFileId, // Matches 'cvField' in Appwrite
                coverLettterFieldId: coverLetterFileId, // Matches 'coverLettterFieldId' in Appwrite
                // submittedAt: new Date().toISOString(), // Removed as it's not in the screenshot schema
            };

            const response = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collectionId,
                ID.unique(),
                documentData
            );

            return response;
        } catch (error) {
            console.error("Error submitting application:", error);
            throw error;
        }
    },

    /**
     * Fetches all job applications.
     * @returns {Promise<Array>} - List of applications.
     */
    async getApplications() {
        if (!appwriteConfig.databaseId || !appwriteConfig.collectionId) {
            throw new Error("Appwrite Database or Collection ID is missing.");
        }
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collectionId
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching applications:", error);
            throw error;
        }
    },

    /**
     * Gets the download URL for a file.
     * @param {string} fileId - The file ID.
     * @returns {string} - The download URL.
     */
    getFileDownloadUrl(fileId) {
        if (!fileId || !appwriteConfig.bucketId) return null;
        return storage.getFileDownload(appwriteConfig.bucketId, fileId);
    },
};
