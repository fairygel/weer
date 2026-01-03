import 'reflect-metadata';
import './types/express';
import Container from 'typedi';
import { Leer } from './Leer';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
	try {
		Container.set('JWT_SECRET', process.env.JWT_SECRET || 'secret');

		const app = Container.get(Leer);

		await app.start(Number(process.env.PORT) || 5000);
	} catch (error: any) {
		console.error(
			`\x1b[91m[leer] Bootstrap failed: ${error.message}\x1b[0m`
		);
		process.exit(1);
	}
}

bootstrap().then(() => {}).catch(err => {
	console.log(err);});
