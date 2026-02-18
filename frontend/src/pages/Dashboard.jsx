import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";

const formatMoney = (value) => Number(value || 0).toFixed(2);

export default function Dashboard() {
  const { transactions, summary, refreshTransactions } = useAuth();

  const recent = useMemo(() => transactions.slice(0, 10), [transactions]);

  return (
    <div className="page-stack">
      <section className="card-grid stats-grid">
        <article className="card stat income">
          <p>Доход</p>
          <h3>{formatMoney(summary.income)}</h3>
        </article>
        <article className="card stat expense">
          <p>Расход</p>
          <h3>{formatMoney(summary.expense)}</h3>
        </article>
        <article className="card stat balance">
          <p>Баланс</p>
          <h3>{formatMoney(summary.balance)}</h3>
        </article>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <h2>Последние транзакции</h2>
            <p>Топ-10 последних операций</p>
          </div>
          <button className="btn btn-ghost" onClick={() => refreshTransactions()}>
            Обновить
          </button>
        </div>

        <div className="table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип</th>
                <th>Категория</th>
                <th>Описание</th>
                <th className="amount-col">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-cell">
                    Пока нет операций
                  </td>
                </tr>
              )}
              {recent.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.tx_date}</td>
                  <td>
                    <span className={`chip ${tx.type === "income" ? "chip-income" : "chip-expense"}`}>
                      {tx.type === "income" ? "Доход" : "Расход"}
                    </span>
                  </td>
                  <td>{tx.category_name || "Без категории"}</td>
                  <td>{tx.description || "-"}</td>
                  <td className="amount-col">{formatMoney(tx.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
