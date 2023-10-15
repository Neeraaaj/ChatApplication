import { Client, Databases} from 'appwrite';
import { Account } from 'appwrite';

export const PROJECT_ID = '652a54b90d70b2a6fad0';
export const DATABASE_ID = '652a7acd22d942290a05';
export const COLLECTION_ID_MESSAGES = '652a7adce4c003b1b330';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652a54b90d70b2a6fad0');

export const databases = new Databases(client);

export const account = new Account(client)

export default client;