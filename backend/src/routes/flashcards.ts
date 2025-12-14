import express from 'express';
import { index } from '../controllers/flashcards';

const router = express.Router();

router.get('/', index);

export default router;
