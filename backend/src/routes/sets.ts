import express from 'express';
import { indexSet, readSet, createSet, updateSet, deleteSet } from '../controllers/sets';

const router = express.Router();

router.get('/', indexSet);
router.get('/:id', readSet);
router.post('/', createSet);
router.patch('/:id', updateSet);
router.delete('/:id', deleteSet);

export default router;
