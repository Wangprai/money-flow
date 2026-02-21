import prisma from "../config/prisma";

export const getTransactionsService = async (
  userId: string,
  query: unknown,
) => {
  return prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
  });
};

export const getTransactionByIdService = async (
  userId: string,
  transactionId: string,
) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId,
    },
    include: { category: true },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

export const createTransactionService = async (userId: string, data: any) => {
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      userId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.transaction.create({
    data: {
      amount: data.amount,
      note: data.note,
      date: new Date(data.date),
      userId,
      categoryId: category.id,
      type: category.type,
    },
    include: { category: true },
  });
};

export const updateTransactionService = async (
  userId: string,
  transactionId: string,
  data: any,
) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  let updateData: any = { ...data };

  if (data.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    updateData.type = category.type;
  }

  return prisma.transaction.update({
    where: { id: transactionId },
    data: updateData,
    include: { category: true },
  });
};

export const deleteTransactionService = async (userId: string, id: string) => {
  const transaction = await prisma.transaction.findFirst({
    where: { id, userId },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return prisma.transaction.delete({
    where: { id },
  });
};
