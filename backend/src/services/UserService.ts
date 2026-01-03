import { Service } from 'typedi';
import { User } from '../models/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getAllUsers() {
		return await this.userRepository.getAllUsers();
	}


	async getUserByUsername(userName: string) {
		return await this.userRepository.getUserByUsername(userName);
	}

	async createUser(username: string, password: string) {
		if (!username || !password) {
			throw new Error('username and password are required');
		}

		const user = new User(username, password);
		return await this.userRepository.createUser(user);
	}

	async updateUser(userId: string, username: string, password: string) {
		if (!username || !password) {
			throw new Error('username and password are required');
		}

		const user = new User(username, password);
		return await this.userRepository.updateUser(userId, user);
	}

	async deleteUser(userId: string) {
		return await this.userRepository.deleteUser(userId);
	}
}

