# ⚽ HotTakes™

> The Ultimate Football Hot Takes Community Platform

Created by Ayokunle | Portfolio: https://ayox.my.id

---

## Overview

HotTakes™ is a production-ready, mobile-first football social media application designed specifically for global football fans. Users can post hot takes, rate tactical opinions, participate in real-time match threads, track live fixtures and transfer market updates, vote on aged takes (Fine Wine vs. Milk), earn prediction XP, and manage club communities.

---

## Key Features

- **Gemini 3.6 AI Hot Take Engine**: Real-time tactical analysis, controversy rating (Mild, Spicy, Nuclear), and moderation checking.
- **Community Verdicts & Aged Like Wine/Milk Voting**: Community-driven debate metrics with retrospective voting on past takes.
- **API-FOOTBALL Integration**: Live match scores, event timelines, upcoming fixtures, and real-time transfer updates.
- **Real-Time Match Engine**: Simulated match clock progression, score updates, and live commentary event feeds.
- **Render Deployment Ready**: Complete `render.yaml` blueprint with Render PostgreSQL database integration.
- **Club & League Communities**: Dedicated feeds for Premier League, La Liga, Serie A, Champions League, and top global clubs.
- **Admin Control & Moderation Hub**: Real-time analytics, user verification management, report queue, and deployment guide.

---

## Tech Stack

### Backend
- Express.js & TypeScript
- PostgreSQL & Prisma ORM
- Google Gemini 3.6 Flash SDK (`@google/genai`)
- API-FOOTBALL (`v3.football.api-sports.io`)
- JWT Authentication & Google OAuth 2.0
- Cloudinary Media Storage API
- Express Validator, Helmet & CORS

### Frontend
- React 18 & TypeScript
- Vite & TailwindCSS
- Lucide React Icons
- Framer Motion

---

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file and configure variables:
   ```bash
   cp .env.example .env
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. For full deployment documentation, see [setup.md](./setup.md).

---

Created by Ayokunle | Portfolio: https://ayox.my.id
