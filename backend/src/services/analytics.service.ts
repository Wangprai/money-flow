import prisma from "../config/prisma";
import { getMonthRange, getYearRange } from "../utils/date.util";

export const monthlySummaryService = async (
  userId: string,
  month: string
) => {
  const { startDate, endDate } = getMonthRange(month);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

export const expenseByCategoryService = async (
  userId: string,
  month: string
) => {
  const { startDate, endDate } = getMonthRange(month);

  const result = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: {
      userId,
      type: "expense",
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const categoryIds = result.map(r => r.categoryId);

  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIds } },
  });

  return result.map(r => {
    const category = categories.find(c => c.id === r.categoryId);
    return {
      category: category?.name || "Unknown",
      amount: r._sum.amount || 0,
    };
  });
};

export const cashFlowService = async (
  userId: string,
  year: string
) => {
  const { startDate, endDate } = getYearRange(year);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  const monthlyData: Record<
    number,
    { income: number; expense: number }
  > = {};

  for (let i = 1; i <= 12; i++) {
    monthlyData[i] = { income: 0, expense: 0 };
  }

  transactions.forEach(t => {
    const month = new Date(t.date).getMonth() + 1;

    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  return Object.keys(monthlyData).map(m => ({
    month: Number(m),
    income: monthlyData[Number(m)].income,
    expense: monthlyData[Number(m)].expense,
  }));
};
