import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, summary } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">MoneyTrack</p>
        <h1 className="topbar-title">Финансовая панель</h1>
      </div>

      <div className="topbar-actions">
        <div className="pill">
          Баланс: <strong>{Number(summary.balance || 0).toFixed(2)}</strong>
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
