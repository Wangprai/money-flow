import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  getMonthlySummary,
  getExpenseByCategory,
  getCashFlow,
} from "../controllers/analytics.controller";
import {
  monthQuerySchema,
  yearQuerySchema,
} from "../validations/analytics.validation";

const router = Router();

router.use(authMiddleware);

router.get("/monthly-summary", validate(monthQuerySchema), getMonthlySummary);
router.get("/expense-by-category", validate(monthQuerySchema), getExpenseByCategory);
router.get("/cash-flow", validate(yearQuerySchema), getCashFlow);

export default router;
