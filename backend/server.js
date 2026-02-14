import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyToken, authorizeRoles } from './middleware/auth.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Main Auth Route Link
app.use('/auth', authRoutes); 

app.get('/', (req, res) => res.send('AI Code Reviewer API is Live!'));

// Code Review Route
app.post('/review', verifyToken, authorizeRoles('user', 'admin'), async (req, res) => {
    try {
        const { code } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Review this code for security: \n${code}`;
        const result = await model.generateContent(prompt);
        res.json({ review: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "Audit failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));