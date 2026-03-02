import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Дашборд" },
  { to: "/add-income", label: "Добавить доход" },
  { to: "/add-expense", label: "Добавить расход" },
  { to: "/categories", label: "Категории" },
  { to: "/analytics", label: "Аналитика" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <p className="brand-eyebrow">Personal Finance</p>
        <h2>MoneyTrack</h2>
        <p className="brand-copy">Смелый минимализм для ежедневного контроля денег.</p>
      </div>

      <nav className="menu">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `menu-link ${isActive ? "menu-link-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <p className="sidebar-foot-label">Today Focus</p>
        <p>Добавь хотя бы 1 доход или расход, чтобы видеть живую динамику.</p>
      </div>
    </aside>
  );
}
