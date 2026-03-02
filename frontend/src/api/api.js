import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const loginRequest = async ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  return api.post("/token", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const registerRequest = (data) => api.post("/register", data);

export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getTransactions = (params) => api.get("/transactions", { params });
export const createTransaction = (data) => api.post("/transactions", data);
export const addIncome = (data) => api.post("/income", { ...data, type: "income" });
export const addExpense = (data) => api.post("/expense", { ...data, type: "expense" });

export const getAnalytics = (params) => api.get("/analytics", { params });
export const getCategoryStats = (params) => api.get("/analytics/categories", { params });
export const getTimeline = (params) => api.get("/analytics/timeline", { params });

export default api;
