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
      navigate("/login");
    } catch {
      setError("Пользователь с таким логином уже существует");
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
