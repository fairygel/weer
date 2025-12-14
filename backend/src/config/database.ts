import { MongoClient, Db } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'flashcards';

let db: Db;

export async function connectDB(): Promise<Db> {
	const client = new MongoClient(MONGO_URI);
	await client.connect();
	db = client.db(DB_NAME);
	console.log('Connected to MongoDB');
	return db;
}

export function getDB(): Db {
	return db;
}
