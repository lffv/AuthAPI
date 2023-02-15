import authRoutes from './auth.routes';
import avatarRoutes from './avatar.routes';
import chatRoutes from './chat.routes';
import express from 'express';
import userRoutes from './user.routes';

const router = express.Router();

router.get('/healthCheck', (_, res) => {
  res.sendStatus(200);
});

router.use(authRoutes);
router.use(avatarRoutes);
router.use(chatRoutes);
router.use(userRoutes);

export default router;
