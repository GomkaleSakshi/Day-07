# Day 07 Internship Assignment

This repository contains a full internship assignment with:

- A Node.js + Express + TypeScript API
- A Next.js + TypeScript dashboard application using App Router

## Project structure

- `node-api/`
- `nextjs-app/`

## 1. Install dependencies

### Backend

```bash
cd node-api
cp .env.example .env
npm install
```

### Frontend

```bash
cd nextjs-app
cp .env.example .env.local
npm install
```

## 2. Run locally

### Backend

```bash
cd node-api
npm run dev
```

The API runs at `http://localhost:5000`.

### Frontend

```bash
cd nextjs-app
npm run dev
```

The frontend runs at `http://localhost:3000`.

## 3. Environment variables

### Backend

File: `node-api/.env.example`

```env
PORT=5000
```

### Frontend

File: `nextjs-app/.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 4. API endpoints

- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

## 5. Frontend pages

- `/employees`
- `/employees/[id]`
- `/employees/create`

## 6. Build for production

### Backend

```bash
cd node-api
npm run build
npm start
```

### Frontend

```bash
cd nextjs-app
npm run build
npm start
```

## 7. Quick smoke test

```bash
curl http://localhost:5000/api/employees
```

## 8. GitHub push instructions

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- The employee store is local and in-memory, so no database setup is required.
- The app is intentionally simple and beginner-friendly.
- Both apps are designed to run locally for internship training and demonstration.
