// Run with: node scripts/create-admin.js
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

// --- CONFIG: change these before running ---
const ADMIN_EMAIL = "admin@spaceviz.com";
const ADMIN_PASSWORD = "Admin1234";
const ADMIN_NAME = "Admin";
// -------------------------------------------

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌  DATABASE_URL is not set. Make sure your .env file exists.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (existing) {
      console.log(`⚠️  User with email "${ADMIN_EMAIL}" already exists. Skipping.`);
      return;
    }

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await prisma.user.create({
      data: { email: ADMIN_EMAIL, password: hash, name: ADMIN_NAME },
    });

    console.log("✅  Admin user created successfully!");
    console.log(`    Email:    ${ADMIN_EMAIL}`);
    console.log(`    Password: ${ADMIN_PASSWORD}`);
    console.log("\n👉 Go to /login to sign in to the admin dashboard.");
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  console.error("❌  Error:", e.message);
  process.exit(1);
});
