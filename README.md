# SPACE Viz Studio

A premium architecture portfolio website built with **Next.js 16**, **Prisma**, **PostgreSQL**, **NextAuth v5**, and **Tailwind CSS v4**.

## ✨ Features

- Public portfolio with projects, about, and contact pages
- Before/after project image slider
- Testimonials carousel
- Contact form with email notifications
- Secure admin dashboard (project management, leads inbox)
- JWT-based authentication with NextAuth v5
- Rate-limited contact form

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth v5 (Credentials) |
| Email | Nodemailer |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Iftekhar-Mahin/space-viz-studio.git
cd space-viz-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL (`http://localhost:3000` for local) |
| `EMAIL_HOST` | SMTP host (e.g. `smtp.gmail.com`) |
| `EMAIL_PORT` | SMTP port (e.g. `587`) |
| `EMAIL_USER` | Sender email address |
| `EMAIL_PASS` | App password (not your login password) |
| `EMAIL_TO` | Where contact form submissions are sent |

### 4. Set up the database

```bash
# Push the schema to your PostgreSQL database
npx prisma db push

# (Optional) Seed with sample data
npm run seed
```

### 5. Create an admin user

Run this once to create your admin account (update the values first):

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('yourpassword', 12);
  await prisma.user.create({ data: { email: 'admin@example.com', password: hash, name: 'Admin' } });
  console.log('Admin created');
}
main().finally(() => prisma.\$disconnect());
"
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Seed the database with sample data |
| `npx prisma studio` | Open Prisma database GUI |

---

## 🌐 Deployment

This project requires a **PostgreSQL** database and a Node.js hosting environment.

**Recommended platforms:**
- [Railway](https://railway.app) — free tier includes PostgreSQL
- [Render](https://render.com) — free PostgreSQL + Node hosting
- [Vercel](https://vercel.com) + [Supabase](https://supabase.com) — serverless + managed Postgres

Set all environment variables from `.env.example` in your hosting platform's dashboard before deploying.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Protected admin dashboard
│   ├── projects/         # Project portfolio pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── login/            # Auth login page
├── components/           # Reusable UI components
├── actions/              # Server Actions (projects, contact, testimonials)
├── lib/                  # Auth, DB, utils, validations
prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Sample data seeder
```
