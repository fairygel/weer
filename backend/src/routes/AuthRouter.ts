import express from 'express';
import { Service } from 'typedi';
import { AuthController } from '../controllers/AuthController';

@Service()
export class AuthRouter {
	constructor(private authController: AuthController) {}

	createAuthRoutes() {
		const router = express.Router();

		router.post('/register', this.authController.register.bind(this.authController));
		router.post('/login', this.authController.login.bind(this.authController));

		return router;
	}
}

