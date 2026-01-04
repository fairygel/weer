import { MongoClient, Db } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class Database {
	private static db: Db;

	async connectDB(): Promise<Db> {
		console.log('\x1b[92m[mongo] Connecting to Database...\x1b[0m');

		const dbUser = process.env.MONGO_USER || 'root';
		const dbPass = process.env.MONGO_PASSWORD || 'password';
		const dbName = process.env.DB_NAME || 'flashcards';

		const uri = `mongodb://mongodb:27017`;

		const client = new MongoClient(uri, {
			auth: {
				username: dbUser,
				password: dbPass,
			},
			authSource: 'admin',
		});

		await client.connect();

		Database.db = client.db(dbName);

		console.log('\x1b[92m[mongo] Connected!\x1b[0m');
		return Database.db;
	}

	getDB(): Db {
		return Database.db;
	}
}
