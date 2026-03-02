import { useEffect, useMemo, useState } from "react";
import { getCategoryStats, getTimeline } from "../api/api";
import { useAuth } from "../context/AuthContext";

const periods = [
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

const money = (n) => Number(n || 0).toFixed(2);

export default function Analytics() {
  const { summary, refreshSummary } = useAuth();
  const [period, setPeriod] = useState("month");
  const [categoryStats, setCategoryStats] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const load = async () => {
      await refreshSummary(period);
      const [catsRes, timelineRes] = await Promise.all([
        getCategoryStats({ period, tx_type: "expense" }),
        getTimeline({ period }),
      ]);
      setCategoryStats(catsRes.data);
      setTimeline(timelineRes.data);
    };

    load();
  }, [period]);

  const maxCategory = useMemo(
    () => Math.max(1, ...categoryStats.map((c) => Number(c.total || 0))),
    [categoryStats]
  );

  return (
    <div className="page-stack analytics-page">
      <section className="hero-panel card">
        <p className="hero-kicker">Insights</p>
        <h2 className="hero-title">Разложим деньги по слоям</h2>
        <p className="hero-copy">Смотри, где концентрируются расходы и как меняется динамика каждый день.</p>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Аналитика</h2>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="card-grid stats-grid">
          <article className="stat-block">
            <span>Доход</span>
            <strong>{money(summary.income)}</strong>
          </article>
          <article className="stat-block">
            <span>Расход</span>
            <strong>{money(summary.expense)}</strong>
          </article>
          <article className="stat-block">
            <span>Итог</span>
            <strong>{money(summary.balance)}</strong>
          </article>
        </div>
      </section>

      <section className="card analytics-split">
        <h3>Расходы по категориям</h3>
        <div className="bars">
          {categoryStats.length === 0 && <p>Нет данных за выбранный период</p>}
          {categoryStats.map((item) => (
            <div key={item.name} className="bar-row">
              <div className="bar-label">{item.name}</div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${(Number(item.total) / maxCategory) * 100}%` }}
                />
              </div>
              <div className="bar-value">{money(item.total)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Динамика по дням</h3>
        <div className="table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Доход</th>
                <th>Расход</th>
                <th className="amount-col">Net</th>
              </tr>
            </thead>
            <tbody>
              {timeline.length === 0 && (
                <tr>
                  <td colSpan={4} className="empty-cell">
                    Нет данных за выбранный период
                  </td>
                </tr>
              )}
              {timeline.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{money(row.income)}</td>
                  <td>{money(row.expense)}</td>
                  <td className="amount-col">{money(row.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
