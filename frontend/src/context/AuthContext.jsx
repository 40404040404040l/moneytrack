import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addExpense,
  addIncome,
  createCategory,
  getAnalytics,
  getCategories,
  getTransactions,
  loginRequest,
  registerRequest,
  setAuthToken,
} from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("token") ? { loggedIn: true } : null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await Promise.all([refreshCategories(), refreshTransactions(), refreshSummary()]);
        setUser({ loggedIn: true });
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const login = async (credentials) => {
    const res = await loginRequest(credentials);
    const newToken = res.data.access_token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser({ loggedIn: true });
  };

  const register = async (payload) => {
    await registerRequest(payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
    setUser(null);
    setTransactions([]);
    setCategories([]);
    setSummary({ income: 0, expense: 0, balance: 0 });
    setLoading(false);
  };

  const refreshTransactions = async (params) => {
    const res = await getTransactions(params);
    setTransactions(res.data);
    return res.data;
  };

  const refreshCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
    return res.data;
  };

  const refreshSummary = async (period = "month") => {
    const res = await getAnalytics({ period });
    setSummary(res.data);
    return res.data;
  };

  const createNewCategory = async (name) => {
    await createCategory({ name });
    return refreshCategories();
  };

  const createIncome = async (payload) => {
    const res = await addIncome(payload);
    setTransactions((prev) => [res.data, ...prev]);
    await refreshSummary();
    return res.data;
  };

  const createExpense = async (payload) => {
    const res = await addExpense(payload);
    setTransactions((prev) => [res.data, ...prev]);
    await refreshSummary();
    return res.data;
  };

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [String(c.id), c.name])),
    [categories]
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        transactions,
        categories,
        summary,
        categoryMap,
        login,
        register,
        logout,
        refreshTransactions,
        refreshCategories,
        refreshSummary,
        createNewCategory,
        createIncome,
        createExpense,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
