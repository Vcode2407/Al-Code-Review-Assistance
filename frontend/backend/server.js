const express = require('express');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

const redis = new Redis();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 1. REGISTER API
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hash]);
        res.status(201).json({ message: "Success" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 2. LOGIN API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows[0] && await bcrypt.compare(password, rows[0].password_hash)) {
            const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        }
        res.status(401).json({ error: "Invalid credentials" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 3. SMART CACHE REVIEW API
app.post('/api/review', async (req, res) => {
    try {
        const { code } = req.body;
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        const cached = await redis.get(hash);
        if (cached) return res.json({ review: JSON.parse(cached), source: 'Redis-Cache' });

        const aiResult = "AI Review: Code looks clean. Consider adding JSDoc comments.";
        await redis.set(hash, JSON.stringify(aiResult), 'EX', 3600);
        res.json({ review: aiResult, source: 'Gemini-API' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(5000, () => console.log('SaaS Backend Running on 5000'));
