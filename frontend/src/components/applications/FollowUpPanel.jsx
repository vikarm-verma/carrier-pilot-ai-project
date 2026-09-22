import { formatDate } from './applicationData'

function FollowUpPanel({ applications, onOpen }) {
  const today = new Date().toISOString().slice(0, 10)
  const active = applications.filter((application) => application.nextFollowUpDate && !['Rejected', 'Withdrawn'].includes(application.status))
  const groups = [['Overdue', active.filter((item) => item.nextFollowUpDate < today)], ['Due today', active.filter((item) => item.nextFollowUpDate === today)], ['Upcoming', active.filter((item) => item.nextFollowUpDate > today)]]
  return <section className="panel application-follow-up-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Next moves</p><h2>Follow-ups</h2></div><span className="context-orb">FU</span></div>{active.length ? <div className="follow-up-list">{groups.map(([label, items]) => items.length ? <div className="follow-up-group" key={label}><h3>{label}<span>{items.length}</span></h3>{items.map((application) => <button className={label === 'Overdue' ? 'follow-up-row follow-up-overdue' : 'follow-up-row'} type="button" onClick={() => onOpen(application)} key={application.id}><div><strong>{application.jobTitle}</strong><p>{application.company}</p></div><span>{formatDate(application.nextFollowUpDate, { month: 'short', day: 'numeric' })}</span></button>)}</div> : null)}</div> : <p className="empty-copy">No active follow-ups. Add a date when an application needs a next step.</p>}</section>
}

export default FollowUpPanel
