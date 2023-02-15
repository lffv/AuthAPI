import express from 'express';
import { createAvatarHandler, getAvatarHandler } from '../controller/avatar.controller';
import requiredUser from '../middleware/requiredUser';

const router = express.Router();

router.post('/api/avatar', requiredUser, createAvatarHandler);
router.get('/api/avatar/user/:userId', requiredUser, getAvatarHandler);
router.get('/api/avatar/:avatarId', requiredUser, getAvatarHandler);

export default router;
