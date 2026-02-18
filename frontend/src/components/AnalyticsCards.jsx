import { useEffect, useState } from "react";
import { getAnalytics, getCategoryStats, getTimeline } from "../api/api";
import PeriodFilter from "../components/filters/PeriodFilter";

export default function Analytics() {
  const [period,setPeriod]=useState("month");
  const [summary,setSummary]=useState({});
  const [categories,setCategories]=useState([]);
  const [timeline,setTimeline]=useState([]);

  useEffect(()=>{
    load();
  },[period]);

  const load = async () => {
    const s = await getAnalytics({period});
    const c = await getCategoryStats({period});
    const t = await getTimeline({period});
    setSummary(s.data);
    setCategories(c.data);
    setTimeline(t.data);
  };

  return (
    <div>
      <h1>Аналитика</h1>
      <PeriodFilter value={period} onChange={setPeriod}/>

      <div style={{display:'flex',gap:'20px'}}>
        <div>Доход: {summary.income}</div>
        <div>Расход: {summary.expense}</div>
        <div>Итог: {summary.balance}</div>
      </div>

      <h3>По категориям</h3>
      <ul>
        {categories.map(c=>(
          <li key={c.id}>{c.name}: {c.total}</li>
        ))}
      </ul>

      <h3>Динамика</h3>
      <ul>
        {timeline.map(t=>(
          <li key={t.date}>{t.date}: {t.amount}</li>
        ))}
      </ul>
    </div>
  );
}