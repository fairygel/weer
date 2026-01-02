import express from 'express';
import { Container } from '../di/container';
import createCardRoutes from './cardRoutes';

export default function createSetRoutes(container: Container) {
	const router = express.Router();

	router.get('/', container.setController.indexSet.bind(container.setController));
	router.get('/:setId', container.setController.readSet.bind(container.setController));
	router.post('/', container.setController.createSet.bind(container.setController));
	router.patch('/:setId', container.setController.updateSet.bind(container.setController));
	router.delete('/:setId', container.setController.deleteSet.bind(container.setController));

	router.use('/:setId/flashcards', createCardRoutes(container));

	return router;
}
