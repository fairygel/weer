import express from 'express';
import { CardController } from '../controllers/CardController';
import { Service } from 'typedi';
import { AuthMiddleware } from '../config/AuthMiddleware';

@Service()
export class CardRouter {
	constructor(private cardController: CardController,
				private auth: AuthMiddleware) {}

	createCardRoutes() {
		const router = express.Router({ mergeParams: true });

		router.get(
			'/',
			this.auth.authenticate,
			this.cardController.indexCard.bind(this.cardController)
		);
		router.get(
			'/:cardId',
			this.auth.authenticate,
			this.cardController.readCard.bind(this.cardController)
		);
		router.post(
			'/',
			this.auth.authenticate,
			this.cardController.createCard.bind(this.cardController)
		);
		router.patch(
			'/:cardId',
			this.auth.authenticate,
			this.cardController.updateCard.bind(this.cardController)
		);
		router.delete(
			'/:cardId',
			this.auth.authenticate,
			this.cardController.deleteCard.bind(this.cardController)
		);

		return router;
	}
}
