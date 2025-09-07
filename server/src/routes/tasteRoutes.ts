import { Router } from 'express';
import { getItems, createItem, delItem } from '../controllers/TasteController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router();

/* GET users listing. */
router.get('/', verifyToken, getItems);

router.post('/add', createItem)

router.delete('/del', delItem)

export default router;