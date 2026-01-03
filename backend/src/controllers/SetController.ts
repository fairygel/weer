import { Request, Response } from 'express';
import { SetService } from '../services/SetService';
import { Service } from 'typedi';

@Service()
export class SetController {
	constructor(private setService: SetService) {}

	async indexSet(req: Request, res: Response) {
		try {
			const sets = await this.setService.getAllSets();
			return res.json(sets);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	async readSet(req: Request, res: Response) {
		try {
			const { setId } = req.params;
			const set = await this.setService.getSetById(setId);

			if (!set) {
				return res.status(404).json({ error: 'Set not found' });
			}

			return res.json(set);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	async createSet(req: Request, res: Response) {
		try {
			const { name, description } = req.body;

			const result = await this.setService.createSet(name, description);
			return res.status(201).json(result);
		} catch (error: any) {
			return res.status(400).json({ error: error.message });
		}
	}

	async updateSet(req: Request, res: Response) {
		try {
			const { setId } = req.params;
			const { name, description } = req.body;

			const updated = await this.setService.updateSet(setId, name, description);

			if (!updated.matchedCount) {
				return res.status(404).json({ error: 'Set not found' });
			}

			return res.json(updated);
		} catch (error: any) {
			return res.status(400).json({ error: error.message });
		}
	}

	async deleteSet(req: Request, res: Response) {
		try {
			const { setId } = req.params;

			const result = await this.setService.deleteSet(setId);

			if (!result.deletedCount) {
				return res.status(404).json({ error: 'Set not found' });
			}
			return res.status(204).send();
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}
}
