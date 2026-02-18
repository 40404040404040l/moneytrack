export default function PeriodFilter({value,onChange}){
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}>
      <option value="week">Неделя</option>
      <option value="month">Месяц</option>
      <option value="year">Год</option>
    </select>
  )
}