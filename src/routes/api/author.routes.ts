import express from 'express';
import { AuthorController } from '../../authors/controllers/author.controller';

const router = express.Router();
const authorController = new AuthorController();

router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.post("/", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);
router.get("/export/xlsx", authorController.exportAuthors);

export default router;