import { Inject, Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../models/AuthPayload';

@Service()
export class JWT {
	constructor(
		@Inject('JWT_SECRET')
		private JWT_SECRET: string
	) {}


	generateToken(id: string, username: string): string {
		const payload: AuthPayload = {
			userId: id,
			username: username
		};

		return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '24h' });
	}

	verifyToken(token: string): AuthPayload {
		try {
			return jwt.verify(token, this.JWT_SECRET) as AuthPayload;
		} catch (error) {
			throw new Error('Invalid token');
		}
	}
}