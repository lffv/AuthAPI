import express from 'express';
import { getGeneratedResponse } from '../controller/chat.controller';
import requiredUser from '../middleware/requiredUser';

const router = express.Router();

router.post('/api/chat', requiredUser, getGeneratedResponse);

export default router;
