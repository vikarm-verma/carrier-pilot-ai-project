function StatCard({ label, value, detail, icon, tone }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-topline">
        <span className="stat-icon">{icon}</span>
        <span className="stat-trend">+12%</span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="stat-detail">{detail}</span>
    </article>
  )
}

export default StatCard
