import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Categories() {
  const { categories, createNewCategory } = useAuth();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      await createNewCategory(trimmed);
      setStatus("Категория сохранена");
      setName("");
    } catch {
      setStatus("Не удалось сохранить категорию");
    }
  };

  return (
    <div className="page-stack">
      <section className="card form-card">
        <h2>Категории</h2>
        <form className="inline-form" onSubmit={handleCreate}>
          <input
            placeholder="Например, Продукты"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary">Добавить</button>
        </form>
        {status && <p className="status-text">{status}</p>}
      </section>

      <section className="card">
        <h3>Список категорий</h3>
        <div className="category-grid">
          {categories.length === 0 && <p>Категории пока не добавлены</p>}
          {categories.map((c) => (
            <span key={c.id} className="category-tag">
              {c.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
