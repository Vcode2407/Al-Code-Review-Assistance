import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyToken, authorizeRoles } from './middleware/auth.js';

dotenv.config();

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Standard Middleware
app.use(cors());
app.use(express.json());

// Auth Routes (Login/Register) - This enables /auth/register and /auth/login
app.use('/auth', authRoutes);

// 1. Public Route: Server Verification
app.get('/', (req, res) => res.send('AI Code Reviewer API is Live!'));

// 2. Secure Route: Code Review
// Requires a valid JWT and 'user' or 'admin' role
app.post('/review', verifyToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const { code } = req.body;
    
    // High-impact prompt for professional code audits
    const prompt = `Perform a deep security and logic audit on the following code. 
    Identify vulnerabilities (XSS, SQLi, etc.) and suggest optimizations: \n\n${code}`;
    
    const result = await model.generateContent(prompt);
    res.json({ 
      user: req.user.id, // Demonstrates multi-user tracking
      review: result.response.text() 
    });
  } catch (error) {
    console.error("Audit Error:", error);
    res.status(500).json({ error: "Audit failed" });
  }
});

// 3. Admin Only Route: Example of Role-Based Access Control
app.get('/admin/stats', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: "Welcome Admin, here are the system stats." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));