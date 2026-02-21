import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  // User
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      password: hashedPassword,
    },
  });

  // Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Salary", type: "income", userId: user.id },
      { name: "Freelance", type: "income", userId: user.id },
      { name: "Food", type: "expense", userId: user.id },
      { name: "Transport", type: "expense", userId: user.id },
      { name: "Entertainment", type: "expense", userId: user.id },
    ],
  });

  const userCategories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  // 💸 Transactions
  await prisma.transaction.createMany({
    data: [
      {
        amount: 50000,
        type: "income",
        note: "Monthly salary",
        date: new Date("2025-01-01"),
        userId: user.id,
        categoryId: userCategories.find(c => c.name === "Salary")!.id,
      },
      {
        amount: 15000,
        type: "income",
        note: "Freelance project",
        date: new Date("2025-01-15"),
        userId: user.id,
        categoryId: userCategories.find(c => c.name === "Freelance")!.id,
      },
      {
        amount: 300,
        type: "expense",
        note: "Lunch",
        date: new Date("2025-01-02"),
        userId: user.id,
        categoryId: userCategories.find(c => c.name === "Food")!.id,
      },
      {
        amount: 1200,
        type: "expense",
        note: "Movie",
        date: new Date("2025-01-10"),
        userId: user.id,
        categoryId: userCategories.find(c => c.name === "Entertainment")!.id,
      },
      {
        amount: 800,
        type: "expense",
        note: "Taxi",
        date: new Date("2025-01-20"),
        userId: user.id,
        categoryId: userCategories.find(c => c.name === "Transport")!.id,
      },
    ],
  });

  console.log("🌱 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });