export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  type?: "income" | "expense";
  userId?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  category?: Category;
  date: string;
  note?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFormData {
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  date: string;
  note?: string;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface ExpenseByCategory {
  category: string;
  categoryId: string;
  amount: number;
}

export interface CashFlowData {
  month: string;
  income: number;
  expense: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}