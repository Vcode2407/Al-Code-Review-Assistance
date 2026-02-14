# AI-Powered Code Review Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

> 🤖 An intelligent AI-driven platform that automates code reviews, detects vulnerabilities, and provides actionable improvement suggestions for modern development teams.

**Developed by [Vcode2407](https://github.com/Vcode2407)**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Deployment](#live-deployment)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

AI-Powered Code Review Assistant streamlines the code review lifecycle using artificial intelligence.  
It analyzes repositories, detects issues, suggests improvements, and provides real-time feedback to development teams.

### Why Use This Tool?

- **Save Time** – Automate repetitive review tasks  
- **Improve Quality** – Catch bugs and security issues early  
- **Learn Best Practices** – AI-generated improvement suggestions  
- **Collaborate Easily** – Multi-developer real-time sessions  
- **Customizable** – Adapt to organization-specific coding standards  

---

## 🌐 Live Deployment

The project is fully deployed and publicly accessible.

### Frontend (Vercel)
- **Platform:** Vercel  
- **Live URL:** https://ai-code-review-assistant-kappa.vercel.app  
- Auto-deploys on every push to `main`  
- Global CDN & optimized static delivery  

### Backend API (Render)
- **Platform:** Render  
- **Live URL:** https://ai-code-review-assistance.onrender.com  
- Node.js Web Service with environment variable security  
- Connected PostgreSQL database  

### Architecture Overview

```
User → Vercel (React Frontend)
        ↓
     Render (Node.js Backend API)
        ↓
     PostgreSQL Database
```

---

## ✨ Features

### 🔍 Core Capabilities

**AI-Powered Code Analysis**
- Automated scoring for commits and pull requests  
- Readability, maintainability, and complexity metrics  
- Multi-language support  

**Security Vulnerability Detection**
- SQL Injection & XSS scanning  
- Unsafe dependency checks  
- Secret & API key exposure detection  

**Performance Optimization**
- Identify inefficient loops & algorithms  
- Query optimization suggestions  
- Memory/resource usage insights  

**Version Control Integration**
- GitHub, GitLab, Bitbucket compatibility  
- Webhook-based PR reviews  
- Inline comments & CI/CD pipeline support  

---

### 🎨 Advanced Features

- Custom Rule Engine  
- Real-Time Collaboration via Socket.IO  
- AI Pair Programmer Mode  
- Generative Auto-Patches  
- Context-Aware Learning  
- Simplified Explanation Mode (ELI5)  

---

## 🛠 Tech Stack

### Backend
- Node.js 18+  
- Express.js  
- TypeScript  
- PostgreSQL  
- Prisma ORM  
- Socket.IO  

### Frontend
- React 18+  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  

### AI & ML
- OpenAI Models  
- Hugging Face Transformers  
- LangChain  

### DevOps
- Docker & Docker Compose  
- Kubernetes Ready  
- GitHub Actions Compatible  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn  
- PostgreSQL (or Docker)  
- Docker & Docker Compose (recommended)  

---

### Installation

#### Option 1: Docker (Recommended)

```bash
git clone https://github.com/Vcode2407/AI-Code-Review-Assistance.git
cd AI-Code-Review-Assistance
docker-compose up -d
```

Frontend → http://localhost:3000  
Backend → http://localhost:3001  

---

#### Option 2: Manual Setup

```bash
git clone https://github.com/Vcode2407/AI-Code-Review-Assistance.git
cd AI-Code-Review-Assistance

npm install

cd backend
npm install
npm run prisma:generate
npm run prisma:migrate

cd ../frontend
npm install

cd ..
npm run dev
```

---

## ⚙️ Configuration

Create `.env` inside `backend/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/code_review_db
OPENAI_API_KEY=your_openai_key
JWT_SECRET=strong_secret_key
PORT=3001
FRONTEND_URL=http://localhost:3000
```

---

## 📁 Project Structure

```text
AI-Code-Review-Assistance/
├── backend/
├── frontend/
├── shared/
├── docker-compose.yml
├── docker-compose.prod.yml
├── LICENSE
└── README.md
```

---

## 📡 API Documentation

### Reviews
```text
POST   /api/reviews
GET    /api/reviews
GET    /api/reviews/:id
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

### AI Analysis
```text
POST /api/ai/analyze
POST /api/ai/explain
POST /api/ai/auto-fix
POST /api/ai/suggest
```

### Authentication
```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

---

## 🚢 Deployment

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Frontend Hosting
- Vercel / Netlify  

### Backend Hosting
- Render / Railway / AWS  

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Push and open a Pull Request  

---

## 📄 License

MIT License © 2026 Vcode2407

---

## 📧 Contact

GitHub: https://github.com/Vcode2407  

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!  
Made with ❤️ by Vcode2407

</div>
