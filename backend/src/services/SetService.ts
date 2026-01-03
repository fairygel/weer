import { Service } from 'typedi';
import { CardSet } from '../models/CardSet';
import { SetRepository } from '../repository/SetRepository';

@Service()
export class SetService {
	constructor(private setRepository: SetRepository) {}

	async getAllSets() {
		return await this.setRepository.getAllSets();
	}

	async getSetById(setId: string) {
		return await this.setRepository.getSetById(setId);
	}

	async createSet(name: string, description?: string) {
		if (!name) {
			throw new Error('name is required');
		}

		const set = new CardSet(name, description);
		return await this.setRepository.createSet(set);
	}

	async updateSet(setId: string, name: string, description?: string) {
		if (!name) {
			throw new Error('name is required');
		}

		const set = new CardSet(name, description);
		return await this.setRepository.updateSet(setId, set);
	}

	async deleteSet(setId: string) {
		return await this.setRepository.deleteSet(setId);
	}
}

