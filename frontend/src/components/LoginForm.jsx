import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label>
        Логин
        <input
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          placeholder="ivan"
          required
        />
      </label>

      <label>
        Пароль
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder="••••••"
          required
        />
      </label>

      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? "Входим..." : "Войти"}
      </button>

      <p className="auth-footnote">
        Нет аккаунта? <Link to="/register">Создать</Link>
      </p>
    </form>
  );
}
