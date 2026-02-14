import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// DO NOT include '/auth' here. server.js already adds it.
router.post('/register', register); 
router.post('/login', login);

export default router;