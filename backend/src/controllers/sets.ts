import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { CardSet } from '../models/CardSet';

const sets: CardSet[] = [];

export function indexSet(req: Request, res: Response) {
	return res.json(sets);
}

export function readSet(req: Request, res: Response) {
	const { id } = req.params;
	const set = sets.find((s) => s.id === id);
	if (!set) return res.status(404).json({ error: 'Not found' });
	return res.json(set);
}

export function createSet(req: Request, res: Response) {
	const { name, description } = req.body;
	if (!name)
		return res.status(400).json({ error: 'userId and name are required' });

	const set = new CardSet(name, description);
	set.id = randomUUID();
	sets.push(set);
	return res.status(201).json(set);
}

export function updateSet(req: Request, res: Response) {
	const { id } = req.params;
	const { name, description } = req.body;
	const set = sets.find((s) => s.id === id);
	if (!set) return res.status(404).json({ error: 'Not found' });

	if (name !== undefined) set.name = name;
	if (description !== undefined) set.description = description;
	set.updatedAt = new Date();

	return res.json(set);
}

export function deleteSet(req: Request, res: Response) {
	const { id } = req.params;
	const idx = sets.findIndex((s) => s.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Not found' });
	sets.splice(idx, 1);
	return res.status(204).send();
}
