import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { Card, CardStatus } from '../models/Card';

const cards: Card[] = [];

export function indexCard(req: Request, res: Response) {
	const { setId } = req.query;
	if (setId) {
		const filtered = cards.filter((c) => c.setId === String(setId));
		return res.json(filtered);
	}

	return res.json(cards);
}

export function readCard(req: Request, res: Response) {
	const { id } = req.params;
	const card = cards.find((c) => c.id === id);
	if (!card) return res.status(404).json({ error: 'Not found' });
	return res.json(card);
}

export function createCard(req: Request, res: Response) {
	const { setId, question, answer, status } = req.body;
	if (!setId || !question || !answer) {
		return res
			.status(400)
			.json({ error: 'setId, question and answer are required' });
	}

	if (status && !Object.values(CardStatus).includes(status)) {
		return res.status(400).json({ error: 'Invalid status' });
	}

	const card = new Card(setId, question, answer, status ?? CardStatus.NEW);
	card.id = randomUUID();
	cards.push(card);
	return res.status(201).json(card);
}

export function updateCard(req: Request, res: Response) {
	const { id } = req.params;
	const { question, answer, status } = req.body;
	const card = cards.find((c) => c.id === id);
	if (!card) return res.status(404).json({ error: 'Not found' });

	if (status && !Object.values(CardStatus).includes(status)) {
		return res.status(400).json({ error: 'Invalid status' });
	}

	if (question !== undefined) card.question = question;
	if (answer !== undefined) card.answer = answer;
	if (status !== undefined) card.status = status;

	return res.json(card);
}

export function deleteCard(req: Request, res: Response) {
	const { id } = req.params;
	const idx = cards.findIndex((c) => c.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Not found' });
	cards.splice(idx, 1);
	return res.status(204).send();
}
