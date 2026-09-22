function ApplicationStats({ counts }) {
  const items = [['Total applications', counts.total, 'AP', 'cyan'], ['Applied', counts.applied, 'AD', 'violet'], ['Screening', counts.screening, 'SC', 'cyan'], ['Interviewing', counts.interviewing, 'IN', 'magenta'], ['Offers', counts.offers, 'OF', 'lime'], ['Rejected', counts.rejected, 'RJ', 'magenta'], ['Withdrawn', counts.withdrawn, 'WD', 'violet'], ['Follow-up due', counts.followUps, 'FU', 'lime']]
  return <div className="application-stats-grid">{items.map(([label, value, icon, tone]) => <article className={`stat-card stat-card-${tone}`} key={label}><div className="stat-card-topline"><span className="stat-icon">{icon}</span><span className="content-stat-pulse" /></div><p>{label}</p><strong>{value}</strong></article>)}</div>
}

export default ApplicationStats
