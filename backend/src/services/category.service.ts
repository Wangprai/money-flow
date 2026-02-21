import prisma from "../config/prisma";

export const getCategoriesService = async (userId: string) => {
  return prisma.category.findMany({
    where: { userId },
  });
};

export const createCategoryService = async (
  userId: string,
  name: string,
  type: string
) => {
  return prisma.category.create({
    data: {
      name,
      type,
      userId,
    },
  });
};

export const updateCategoryService = async (
  userId: string,
  categoryId: string,
  name: string,
  type: string
) => {
  return prisma.category.updateMany({
    where: {
      id: categoryId,
      userId, 
    },
    data: {
      name,
      type,
    },
  });
};

export const deleteCategoryService = async (
  userId: string,
  categoryId: string
) => {
  return prisma.category.delete({
    where: {
      id: categoryId,
      userId,
    },
  });
};
