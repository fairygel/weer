import { Request, Response } from 'express';
import { Service } from 'typedi';
import { AuthService } from '../services/AuthService';

@Service()
export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response) {
		try {
			const { username, password } = req.body;

			const result = await this.authService.register(username, password);
			return res.status(201).json({
				message: 'User registered successfully',
				userId: result
			});
		} catch (error: any) {
			return res.status(400).json({ error: error.message });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, password } = req.body;

			const result = await this.authService.login(username, password);
			return res.status(200).json(result);
		} catch (error: any) {
			return res.status(400).json({ error: error.message });
		}
	}
}

