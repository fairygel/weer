import { MongoClient, Db } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class Database {
	private static db: Db;

	async connectDB(): Promise<Db> {
		console.log('\x1b[92m[mongo] Connecting to Database...\x1b[0m');

		const uri = `mongodb://${process.env.MONGO_USER || 'root'}:${process.env.MONGO_PASSWORD || 'password'}@mongodb:27017/?authSource=admin`;
		const dbName = process.env.DB_NAME || 'flashcards';
		const client = new MongoClient(uri);
		await client.connect();

		Database.db = client.db(dbName);

		console.log('\x1b[92m[mongo] Connected!\x1b[0m');
		return Database.db;
	}

	getDB(): Db {
		return Database.db;
	}
}
