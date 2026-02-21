import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} from "../validations/category.validation";

const router = Router();

router.use(authMiddleware);

router.get("/", getCategories);
router.post("/", validate(createCategorySchema), createCategory);
router.put("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", validate(idParamSchema), deleteCategory);

export default router;
