import { useEffect, useState } from "react";
import api from "../api/api";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id} className="border-b py-2 flex justify-between">
            <span>{t.category} ({t.type})</span>
            <span>${t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
