import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Database } from './config/Database';
import { SetRouter } from './routes/SetRouter';
import { AuthRouter } from './routes/AuthRouter';
import { Service } from 'typedi';

@Service()
export class Leer {
	constructor (
		private setRouter: SetRouter,
		private authRouter: AuthRouter,
		private database: Database
	) {}

	async start(PORT: number) {
		try {
			const app = express();
			app.use(cors());
			app.use(express.json());

			await this.database.connectDB();

			app.use('/api/auth', this.authRouter.createAuthRoutes());
			app.use('/api/sets', this.setRouter.createSetRoutes());
			app.set('trust proxy', true);

			app.listen(PORT, '0.0.0.0', () => {
				console.log(
					`\x1b[36m[leer] Server is running on http://localhost:${PORT}\x1b[0m`
				);
			});
		} catch (error) {
			console.error(
				`\x1b[36m[leer] Failed to start server: ${error}\x1b[0m`
			);
		}
	}
}
