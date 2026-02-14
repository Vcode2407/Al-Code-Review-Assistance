import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
// Import the security middleware you just created
import { verifyToken, authorizeRoles } from './middleware/auth.js';

dotenv.config();

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Standard Middleware
app.use(cors());
app.use(express.json());

// 1. Public Route: Verification (No token needed)
app.get('/', (req, res) => res.send('AI Code Reviewer API is Live!'));

// 2. Secure Route: Code Review
// Now requires a valid JWT and 'user' or 'admin' role to access
app.post('/review', verifyToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const { code } = req.body;
    
    // Professional prompt for the SDE-level logic
    const prompt = `Perform a deep security and logic audit on the following code. 
    Identify vulnerabilities (XSS, SQLi, etc.) and suggest optimizations: \n\n${code}`;
    
    const result = await model.generateContent(prompt);
    res.json({ 
      user: req.user.id, // Proof of multi-user support
      review: result.response.text() 
    });
  } catch (error) {
    console.error("Audit Error:", error);
    res.status(500).json({ error: "Audit failed" });
  }
});

// 3. Admin Only Route: Example of RBAC
app.get('/admin/stats', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: "Welcome Admin, here are the system stats." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));