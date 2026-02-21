import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  createCategoryService,
  getCategoriesService,
  deleteCategoryService,
  updateCategoryService,
} from "../services/category.service";
import { ca } from "zod/v4/locales";

// get all categories
export const getCategories = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const categories = await getCategoriesService(req.user!.userId);

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// create new category
export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { name, type } = req.body;

    const category = await createCategoryService(req.user!.userId, name, type);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category", error
    });
  }
};

// update category
export const updateCategory = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = String(req.params.id);
    const { name, type } = req.body;

    const updated = await updateCategoryService(
      req.user!.userId,
      id,
      name,
      type,
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

// delete category
export const deleteCategory = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    await deleteCategoryService(req.user!.userId, id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
