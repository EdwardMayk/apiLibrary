import express from 'express';
import { BookController } from '../../books/controllers/book.controller';


const router = express.Router();
const bookController = new BookController();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.get('/export/xlsx', bookController.exportBooks);


export default router;