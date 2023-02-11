import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import express from 'express';
import userRoutes from './user.routes';

const router = express.Router();

router.get('/healthCheck', (_, res) => {
  res.sendStatus(200);
});

router.use(userRoutes);
router.use(authRoutes);
router.use(chatRoutes);

export default router;
