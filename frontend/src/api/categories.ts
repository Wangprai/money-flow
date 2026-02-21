import api from "./axios";
import { ApiResponse, Category } from "@/types";

export const categoriesApi = {
  getAll: () => api.get<ApiResponse<Category[]>>("/categories"),
  create: (data: { name: string; type?: string }) => api.post<ApiResponse<Category>>("/categories", data),
  update: (id: string, data: { name: string; type?: string }) => api.put<ApiResponse<Category>>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};
