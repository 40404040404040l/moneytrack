import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Пароль должен быть не меньше 6 символов");
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail;

      if (status === 400 && detail === "Username already registered") {
        setError("Пользователь с таким логином уже существует");
      } else if (status === 422) {
        setError("Проверь введенные данные");
      } else if (!err?.response) {
        setError("Нет соединения с сервером");
      } else {
        setError(typeof detail === "string" ? detail : "Не удалось зарегистрироваться");
      }
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
          placeholder="Не менее 6 символов"
          required
        />
      </label>

      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? "Создаем..." : "Создать аккаунт"}
      </button>

      <p className="auth-footnote">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}
