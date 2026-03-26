import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

//=========== AUTH ===========//
router.post('/auth/register', register);
router.post('/auth/login', login);

//=========== PROTECTED ROUTE ===========//
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message: 'Get current user success',
        user: req.user
    });
});

export default router;