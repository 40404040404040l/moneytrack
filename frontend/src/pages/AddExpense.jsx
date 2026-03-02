import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const today = new Date().toISOString().slice(0, 10);

export default function AddExpense() {
  const { categories, refreshCategories, createExpense } = useAuth();
  const [form, setForm] = useState({ amount: "", category_id: "", tx_date: today, description: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    refreshCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await createExpense({
        amount: Number(form.amount),
        category_id: form.category_id ? Number(form.category_id) : null,
        tx_date: form.tx_date,
        description: form.description,
      });
      setStatus("Расход успешно добавлен");
      setForm((prev) => ({ ...prev, amount: "", description: "" }));
    } catch {
      setStatus("Не удалось добавить расход");
    }
  };

  return (
    <div className="page-stack">
      <section className="hero-panel card">
        <p className="hero-kicker">Cash Out</p>
        <h2 className="hero-title">Добавь расход точно</h2>
        <p className="hero-copy">Фиксируй траты сразу, чтобы аналитика расходов не искажалась.</p>
      </section>

      <section className="card form-card">
        <h2>Новая запись расхода</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Сумма
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            />
          </label>

          <label>
            Категория
            <select
              value={form.category_id}
              onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
            >
              <option value="">Без категории</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Дата
            <input
              type="date"
              required
              value={form.tx_date}
              onChange={(e) => setForm((prev) => ({ ...prev, tx_date: e.target.value }))}
            />
          </label>

          <label className="wide">
            Описание
            <input
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Например, продукты или транспорт"
            />
          </label>

          <button className="btn btn-primary wide">Сохранить расход</button>
        </form>

        {status && <p className="status-text">{status}</p>}
      </section>
    </div>
  );
}
