import express from 'express'; // Added this missing line
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyToken, authorizeRoles } from './middleware/auth.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); 

app.get('/', (req, res) => res.send('AI Code Reviewer API is Live!'));

app.post('/review', verifyToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const { code } = req.body;
    // Corrected to GEMINI_API_KEY
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Perform a deep security audit: \n\n${code}`;
    const result = await model.generateContent(prompt);
    res.json({ user: req.user.id, review: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Audit failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));// Force Update 
// Force Update 
