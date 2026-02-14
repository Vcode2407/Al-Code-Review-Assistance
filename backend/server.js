import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Root Route (Shows in browser when you visit the link)
app.get('/', (req, res) => {
    res.send('AI Code Reviewer API is Live!');
});

// 2. Review Route (This is what your frontend will call)
app.post('/review', async (req, res) => {
    // Put your Gemini API logic here later
    res.json({ message: "Review endpoint reached!" });
});

// 3. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});