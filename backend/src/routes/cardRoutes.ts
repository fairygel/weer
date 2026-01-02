import express from 'express';
import { Container } from '../di/container';

export default function createCardRoutes(container: Container) {
	const router = express.Router({ mergeParams: true });

	router.get('/', container.cardController.indexCard.bind(container.cardController));
	router.get('/:cardId', container.cardController.readCard.bind(container.cardController));
	router.post('/', container.cardController.createCard.bind(container.cardController));
	router.patch('/:cardId', container.cardController.updateCard.bind(container.cardController));
	router.delete('/:cardId', container.cardController.deleteCard.bind(container.cardController));

	return router;
}
