import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Categories() {
  const { categories, createNewCategory, removeCategory } = useAuth();
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

  const handleDelete = async (id) => {
    try {
      await removeCategory(id);
      setStatus("Категория удалена");
    } catch {
      setStatus("Не удалось удалить категорию");
    }
  };

  return (
    <div className="page-stack">
      <section className="hero-panel card">
        <p className="hero-kicker">Taxonomy</p>
        <h2 className="hero-title">Собери свою систему категорий</h2>
        <p className="hero-copy">Категории задают порядок в аналитике. Оставь только те, что реально используешь.</p>
      </section>

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
              <button
                type="button"
                className="btn-link danger"
                onClick={() => handleDelete(c.id)}
              >
                удалить
              </button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
