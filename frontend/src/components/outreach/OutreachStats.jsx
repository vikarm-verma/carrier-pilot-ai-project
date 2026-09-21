function OutreachStats({ counts }) {
  const stats = [['Total Contacts', counts.contacts], ['Draft Messages', counts.drafts], ['Sent', counts.sent], ['Follow-up Due', counts.followUps], ['Replied', counts.replied]]
  return <div className="outreach-stats-grid">{stats.map(([label, value], index) => <article className={`stat-card stat-card-${['cyan', 'violet', 'magenta', 'lime', 'cyan'][index]}`} key={label}><div className="stat-card-topline"><span className="stat-icon">{['CT', 'DR', 'SN', 'FU', 'RP'][index]}</span><span className="content-stat-pulse" /></div><p>{label}</p><strong>{value}</strong></article>)}</div>
}

export default OutreachStats
