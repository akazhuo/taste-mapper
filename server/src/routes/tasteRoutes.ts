import { Router } from 'express';
import { getItems, createItem, delItem } from '../controllers/TasteController'
import { authMiddleware } from '../middlewares/authHandlers'

const router = Router();

/* GET users listing. */
router.get('/', authMiddleware, getItems);

router.post('/add', createItem)

router.delete('/del', delItem)

export default router;