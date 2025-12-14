import express, { Request, Response } from 'express';
import flashcardRoutes from './routes/flashcards';

const app = express();
const PORT = 5000;

function main() {
	app.use(express.json());

	app.use('/api/flashcards', flashcardRoutes);

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

main();
