import { Router } from 'express';
import { getBooks, comprarLibro } from '../controllers/bookController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', getBooks);
router.post('/:id/comprar', protect, comprarLibro);

export default router;
