import express from 'express';
import { Service } from 'typedi';
import { SetController } from '../controllers/SetController';
import { CardRouter } from './CardRouter';
import { AuthMiddleware } from '../config/AuthMiddleware';

@Service()
export class SetRouter {
	constructor(
		private setController: SetController,
		private cardRouter: CardRouter,
		private auth: AuthMiddleware,
	) {
	}

	createSetRoutes() {
		const router = express.Router();

		router.get(
			'/',
			this.auth.authenticate,
			this.setController.indexSet.bind(this.setController)
		);

		router.get(
			'/:setId',
			this.auth.authenticate,
			this.setController.readSet.bind(this.setController),
		);

		router.post(
			'/',
			this.auth.authenticate,
			this.setController.createSet.bind(this.setController)
		);

		router.patch(
			'/:setId',
			this.auth.authenticate,
			this.setController.updateSet.bind(this.setController),
		);

		router.delete(
			'/:setId',
			this.auth.authenticate,
			this.setController.deleteSet.bind(this.setController),
		);

		router.use(
			'/:setId/flashcards',
			this.auth.authenticate,
			this.cardRouter.createCardRoutes()
		);

		return router;
	}
}
