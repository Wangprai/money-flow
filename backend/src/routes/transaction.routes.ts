import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionQuerySchema,
  idParamSchema,
} from "../validations/transaction.validation";

const router = Router();

router.use(authMiddleware);

router.get("/", validate(transactionQuerySchema), getTransactions);
router.get("/:id", validate(idParamSchema), getTransactionById);
router.post("/", validate(createTransactionSchema), createTransaction);
router.put("/:id", validate(updateTransactionSchema), updateTransaction);
router.delete("/:id", validate(idParamSchema), deleteTransaction);

export default router;
