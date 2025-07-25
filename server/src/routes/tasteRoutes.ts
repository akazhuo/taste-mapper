import { Router } from 'express';
import { getItems, createItem, delItem } from '../controllers/TasteController'

const router = Router();

/* GET users listing. */
router.get('/', getItems);

router.post('/add', createItem)

router.delete('/del', delItem)

module.exports = router;