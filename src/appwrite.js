import {  Query, Client, Databases, Account, Teams   } from "appwrite";

// Appwrite istemcisi tanımı
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite sunucu URL'si
    .setProject('6786aee6002faa7794b1');     // Appwrite proje ID'si

export const account = new Account(client);
export const databases = new Databases(client);
export const query = new Query(client);
export const teams = new Teams(client);
export const users = new Account (client);