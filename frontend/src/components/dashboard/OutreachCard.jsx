function OutreachCard({ initials, name, role, status, tone }) {
  return (
    <article className="outreach-card interactive-card">
      <span className={`outreach-avatar outreach-avatar-${tone}`}>{initials}</span>
      <div className="outreach-content">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      <span className={`outreach-status outreach-status-${tone}`}>{status}</span>
    </article>
  )
}

export default OutreachCard
