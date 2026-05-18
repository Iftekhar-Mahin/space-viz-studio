require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const newEmail = "spaceviz.studio@gmail.com";
  const newPassword = "Space-Viz$Studio@Chanchal";
  const hashedPassword = await hash(newPassword, 12);

  // Check if old admin exists and delete it to avoid confusion
  const oldAdmin = await prisma.user.findUnique({
    where: { email: "admin@spaceviz.studio" },
  });
  if (oldAdmin) {
    await prisma.user.delete({ where: { email: "admin@spaceviz.studio" } });
    console.log("Deleted old admin user");
  }

  // Upsert the new admin user
  await prisma.user.upsert({
    where: { email: newEmail },
    update: {
      password: hashedPassword,
      name: "Admin",
    },
    create: {
      email: newEmail,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log(`Admin user successfully updated to ${newEmail}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
