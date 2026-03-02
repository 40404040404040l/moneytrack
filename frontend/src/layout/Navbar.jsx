import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageMeta = {
  "/": {
    title: "Control Room",
    subtitle: "Следи за движением денег в реальном времени.",
  },
  "/add-income": {
    title: "Новый Доход",
    subtitle: "Добавь поступления и сразу обнови баланс.",
  },
  "/add-expense": {
    title: "Новый Расход",
    subtitle: "Фиксируй траты, чтобы держать бюджет под контролем.",
  },
  "/categories": {
    title: "Категории",
    subtitle: "Собери свою систему тегов под личный стиль расходов.",
  },
  "/analytics": {
    title: "Аналитика",
    subtitle: "Смотри тренды и структуру расходов по периодам.",
  },
};

export default function Navbar() {
  const { logout, summary } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    []
  );

  const meta = pageMeta[pathname] ?? pageMeta["/"];

  return (
    <header className="topbar">
      <div className="topbar-intro">
        <p className="topbar-label">MoneyTrack / {today}</p>
        <h1 className="topbar-title">{meta.title}</h1>
        <p className="topbar-subtitle">{meta.subtitle}</p>
      </div>

      <div className="topbar-actions">
        <div className="pill balance-pill">
          <span>Баланс</span>
          <strong>{Number(summary.balance || 0).toFixed(2)}</strong>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
