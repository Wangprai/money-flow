import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  monthlySummaryService,
  expenseByCategoryService,
  cashFlowService,
} from "../services/analytics.service";

// get monthly summary  
export const getMonthlySummary = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  const data = await monthlySummaryService(
    req.user!.userId,
    month as string
  );

  res.status(200).json({
    success: true,
    data: data
  });
};

// get expense by category
export const getExpenseByCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  const data = await expenseByCategoryService(
    req.user!.userId,
    month as string
  );

  res.status(200).json({
    success: true,
    data: data
  });
};

// get cash flow
export const getCashFlow = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ message: "Year is required" });
  }

  const data = await cashFlowService(
    req.user!.userId,
    year as string
  );

  res.status(200).json({
    success: true,
    data: data
  });
};