function FollowUpPanel({ records }) {
  const today = new Date().toISOString().slice(0, 10)
  const followUps = records.filter((record) => record.followUpDate && !['Closed', 'Replied'].includes(record.status)).sort((left, right) => left.followUpDate.localeCompare(right.followUpDate))
  const groups = [
    ['Overdue', followUps.filter((record) => record.followUpDate < today)],
    ['Due today', followUps.filter((record) => record.followUpDate === today)],
    ['Upcoming', followUps.filter((record) => record.followUpDate > today)],
  ]

  return <section className="panel follow-up-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Stay intentional</p><h2>Follow-ups</h2></div><span className="context-orb">FU</span></div>{followUps.length ? <div className="follow-up-list">{groups.map(([label, items]) => items.length ? <div className="follow-up-group" key={label}><h3>{label} <span>{items.length}</span></h3>{items.map((record) => { const contact = record.contact || { name: 'Deleted contact', company: 'Unknown company' }; return <article className={label === 'Overdue' ? 'follow-up-row follow-up-overdue' : 'follow-up-row'} key={record.id}><div><strong>{contact.name}</strong><p>{contact.company} · {record.messageType}</p></div><span>{formatDate(record.followUpDate)}</span></article> })}</div> : null)}</div> : <p className="empty-copy">No active follow-ups. Add a date to a message to keep the next step visible.</p>}</section>
}

function formatDate(value) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) }

export default FollowUpPanel
