import express from 'express';
import { AuthController } from '../../auth/controllers/auth.controller';


const authController = new AuthController();

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;