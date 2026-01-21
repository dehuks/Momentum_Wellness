export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '68cbf842001a9b6ec3da', // Existing Project ID from src/lib/appwrite.js
    endpoint: 'https://cloud.appwrite.io/v1', // Existing Endpoint
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};
