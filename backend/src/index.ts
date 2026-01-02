import express from 'express';
import createSetRoutes from './routes/setRoutes';
import dotenv from 'dotenv';
import { Database } from './config/database';
import { createContainer } from './di/container';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

async function main() {
	try {
		await Database.connectDB();
		const db = Database.getDB();

		const container = createContainer(db);

		app.use('/api/sets', createSetRoutes(container));

		app.listen(PORT, () => {
			console.log(`\x1b[36m[leer] Server is running on http://localhost:${PORT}\x1b[0m`);
		});
	} catch (error) {
		console.error(`\x1b[36m[leer] Failed to start server: ${error}\x1b[0m`);
	}
}

main();
