import express from 'express';
import flashcardRoutes from './routes/flashcards';
import setsRoutes from './routes/sets';
import { connectDB } from './config/database';

const app = express();
const PORT = 5000;

app.use(express.json());

async function main() {
	try {
		//await connectDB();

		app.use('/api/flashcards', flashcardRoutes);
		app.use('/api/sets', setsRoutes);

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
	}
}

main();
