import { Client, Databases} from 'appwrite';

export const PROJECT_ID = '65b3f9acb2dd858313a8'
export const DATABASE_ID = '65b3fd34dbfb7c55911b'
export const COLLECTION_ID_MESSAGES = '65b3fea5182a5ec04048'

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65b3f9acb2dd858313a8');

export const databases = new Databases(client);

export default client;