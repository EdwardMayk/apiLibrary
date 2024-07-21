import express from 'express';
import { UserController } from '../../users/controllers/user.controller';

const userController = new UserController();

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:email", userController.findUserByEmail);
router.post("/", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/authorsBooks/export/xlsx", userController.exportAuthorsBooks);

export default router;