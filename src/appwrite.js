import {  Query, Client, Databases, Account, Teams } from "appwrite";

// Appwrite istemcisi tanımı
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite sunucu URL'si
    .setProject('6786aee6002faa7794b1')     // Appwrite proje ID'si
    .setJWT("standard_08f20fb559390baeab86a53a5da396b979e417111bb64ad30ef0d4cc9eb311259378f8fe20edda6ad106e08177229454fda5229304d6525b92ca2a9404aec487b41785f02c1bfeeef69b3a245546833df82a8bfc082ff71f4a49bb2b9ca90e5a7393d235e5cfc0442d6764747bc20e5b205fd4a433ba78b04a741caabee94d49");
export const account = new Account(client);
export const databases = new Databases(client);
export const query = new Query(client);
export const teams = new Teams(client);