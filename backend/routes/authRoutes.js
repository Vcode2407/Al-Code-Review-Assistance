import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// server.js already adds '/auth', so we only use '/' and '/register' here
router.post('/register', register); 
router.post('/login', login);

export default router;