import api from "./axios";
import { ApiResponse, Transaction, TransactionFormData } from "@/types";

export const transactionsApi = {
  getAll: () => api.get<ApiResponse<Transaction[]>>("/transactions"),
  getById: (id: string) => api.get<ApiResponse<Transaction>>(`/transactions/${id}`),
  create: (data: TransactionFormData) => api.post<ApiResponse<Transaction>>("/transactions", data),
  update: (id: string, data: TransactionFormData) => api.put<ApiResponse<Transaction>>(`/transactions/${id}`, data),
  delete: (id: string) => api.delete(`/transactions/${id}`),
};
