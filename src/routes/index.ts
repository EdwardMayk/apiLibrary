import express from 'express';
import authRoutes from './api/auth.routes';
import userRoutes from './api/user.routes';
import authorRoutes from './api/author.routes';
import bookRoutes from './api/book.routes';
import checkJwt from '../auth/middleware/session';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/authors', checkJwt, authorRoutes);
router.use('/api/books', checkJwt, bookRoutes);

export default router;