import express from 'express';

import {
	indexCard,
	readCard,
	createCard,
	updateCard,
	deleteCard,
} from '../controllers/cards';

const router = express.Router();

router.get('/', indexCard);
router.get('/:id', readCard);
router.post('/', createCard);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;
