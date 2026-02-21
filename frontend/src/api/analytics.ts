import api from "./axios";
import { MonthlySummary, ExpenseByCategory, CashFlowData, ApiResponse } from "@/types";

export const analyticsApi = {
  getMonthlySummary: (month: string) =>
    api.get<ApiResponse<MonthlySummary>>("/analytics/monthly-summary", { params: { month } }),

  getExpenseByCategory: (month: string) =>
    api.get<ApiResponse<ExpenseByCategory[]>>("/analytics/expense-by-category", { params: { month } }),

  getCashFlow: (year: string) =>
    api.get<ApiResponse<CashFlowData[]>>("/analytics/cash-flow", { params: { year } }),
};
