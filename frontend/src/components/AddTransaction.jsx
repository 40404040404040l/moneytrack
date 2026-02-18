import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddTransaction() {
  const { categories, addTransaction } = useAuth();
  const [form, setForm] = useState({ amount: "", category: "", type: "income", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return alert("Заполните сумму и категорию");
    await addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm({ amount: "", category: "", type: "income", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить транзакцию</h2>
      <input placeholder="Сумма" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
      <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
        <option value="">Выберите категорию</option>
        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <input placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
      <button>Добавить</button>
    </form>
  );
}
