[![CI](https://github.com/nunazo987/mental-health-quiz/actions/workflows/ci.yml/badge.svg)](https://github.com/nunazo987/mental-health-quiz/actions/workflows/ci.yml)

# Mental Health Quiz — Backend API

**Author:** Nuno Silva  
**Course:** Laboratórios Práticos  
**Topic:** Mental Health Literacy Quiz — SDG 3 (Good Health and Well-Being)

---

## Description

REST API built with **Node.js + Express + TypeScript** to manage quiz questions about mental health literacy. Implements full CRUD operations on the `/questions` resource.

---

## Tech Stack

| Technology | Details |
|------------|---------|
| Node.js | 18+ |
| Express | 4.x |
| TypeScript | 5.x |
| ESLint | Configured for ES Modules |

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── questionsController.ts
│   ├── models/
│   │   └── questions.ts
│   ├── routes/
│   │   └── questions.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

## Running Locally

```bash
cd backend
npm install
npm run dev
```

Server starts at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/questions` | Returns all questions |
| GET | `/questions/:id` | Returns a question by ID |
| POST | `/questions` | Creates a new question |
| PUT | `/questions/:id` | Updates an existing question |
| DELETE | `/questions/:id` | Deletes a question |

---

## CI/CD

GitHub Actions pipeline runs automatically on Pull Requests:
- ESLint check
- TypeScript build

---

## Notes

- Data is currently stored in memory. **Supabase** integration planned for the next phase.
- Uses **ES Modules** (`"type": "module"` in `package.json`).
- **JWT authentication** via Supabase Auth coming in the next phase.
