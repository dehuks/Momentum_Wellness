import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("68cbf842001a9b6ec3da"); 

export const databases = new Databases(client);
export const storage = new Storage(client);

