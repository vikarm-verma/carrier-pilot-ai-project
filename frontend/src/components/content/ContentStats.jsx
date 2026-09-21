const statStyles = ['cyan', 'violet', 'magenta', 'lime', 'cyan']
const statIcons = ['ALL', 'IDEA', 'DRAFT', 'PLAN', 'LIVE']

function ContentStats({ counts }) {
  const stats = [
    ['Total Content', counts.total],
    ['Ideas', counts.idea],
    ['Drafts', counts.draft],
    ['Scheduled', counts.scheduled],
    ['Published', counts.published],
  ]

  return (
    <div className="content-stats-grid">
      {stats.map(([label, value], index) => (
        <article className={`stat-card stat-card-${statStyles[index]}`} key={label}>
          <div className="stat-card-topline"><span className="stat-icon">{statIcons[index]}</span><span className="content-stat-pulse" /></div>
          <p>{label}</p>
          <strong>{value}</strong>
        </article>
      ))}
    </div>
  )
}

export default ContentStats