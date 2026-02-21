import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  createTransactionService,
  getTransactionsService,
  deleteTransactionService,
  updateTransactionService,
  getTransactionByIdService,
} from "../services/transaction.service";

// get all transactions
export const getTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const transactions = await getTransactionsService(
      req.user!.userId,
      req.query,
    );

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch transactions",
    });
  }
};

// get transaction by id
export const getTransactionById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    const transaction = await getTransactionByIdService(req.user!.userId, id);

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch transaction",
    });
  }
};

// create transaction
export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const transaction = await createTransactionService(
      req.user!.userId,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||"Failed to create transaction",
    });
  }
};

// update transaction
export const updateTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    const updated = await updateTransactionService(
      req.user!.userId,
      id,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update transaction",
    });
  }
};

// delete transaction
export const deleteTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    await deleteTransactionService(req.user!.userId, id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete transaction",
    });
  }
};
