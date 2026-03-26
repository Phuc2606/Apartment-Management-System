// src/routes/user.routes.js
import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getMe, updateMe } from '../controllers/user.controller.js'

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getMe);
router.patch('/me', updateMe);

export default router;