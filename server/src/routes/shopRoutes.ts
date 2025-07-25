import { Router } from 'express';
const controller = require('../controllers/ShopController');

const router = Router();

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;