import { Service } from 'typedi';
import { UserService } from './UserService';
import { JWT } from '../config/JWT';
import bcrypt from 'bcrypt'

@Service()
export class AuthService {
	constructor(private userService: UserService,
				private jwt: JWT) {}

	async register(username: string, password: string) {
		if (!username || !password) {
			throw new Error('username and password are required');
		}

		let user = await this.userService.getUserByUsername(username)

		if (user) {
			throw new Error('username already exists');
		}

		const encryptedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

		let inserted = await this.userService.createUser(username, encryptedPassword);

		return this.jwt.generateToken(inserted.insertedId.toString(), username);
	}

	async login(username: string, password: string) {
		if (!username || !password) {
			throw new Error('username and password are required');
		}

		let user = await this.userService.getUserByUsername(username)

		if (!user) {
			throw new Error('username not exists');
		}

		if (!await bcrypt.compare(password, user.password)) {
			throw new Error('invalid password');
		}

		return { token: this.jwt.generateToken(user._id.toString(), user.name) };
	}
}

