import { Client, Databases, Storage } from "appwrite";

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || "68cbf842001a9b6ec3da";



const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);

