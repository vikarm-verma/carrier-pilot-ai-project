function FollowUpPanel({ records }) {
  const today = new Date().toISOString().slice(0, 10)
  const followUps = records.filter((record) => record.followUpDate && record.status === 'Follow-up Due').sort((left, right) => left.followUpDate.localeCompare(right.followUpDate))
  return <section className="panel follow-up-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Stay intentional</p><h2>Follow-ups</h2></div><span className="context-orb">FU</span></div>{followUps.length ? <div className="follow-up-list">{followUps.map((record) => { const overdue = record.followUpDate < today; const dueToday = record.followUpDate === today; return <article className={overdue ? 'follow-up-row follow-up-overdue' : 'follow-up-row'} key={record.id}><div><strong>{record.contact.name}</strong><p>{record.contact.company} · {record.messageType}</p></div><span>{overdue ? 'Overdue' : dueToday ? 'Due today' : `Upcoming · ${formatDate(record.followUpDate)}`}</span></article> })}</div> : <p className="empty-copy">No follow-ups due. Add a date to a message to keep the next step visible.</p>}</section>
}

function formatDate(value) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) }

export default FollowUpPanel
