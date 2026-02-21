import api from "./axios";
import { AuthResponse, User } from "@/types";

export const authApi = {
  register: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  getMe: () => api.get<User>("/auth/profile"),
};
