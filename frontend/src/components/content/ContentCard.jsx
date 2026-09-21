function ContentCard({ item, onEdit, onDelete }) {
  return (
    <article className="content-library-card">
      <div className="content-card-heading"><div><span className={`content-status content-status-${item.status}`}>{item.status}</span><h3>{item.title}</h3></div><button className="more-button" type="button" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.title}`}>x</button></div>
      <p className="content-preview-text">{item.content || item.description}</p>
      <div className="content-meta"><span>{item.category}</span><span>{item.contentType}</span>{item.plannedDate && <time>Planned {formatDate(item.plannedDate)}</time>}<time>Updated {formatDate(item.updatedAt)}</time></div>
      <button className="content-card-link" type="button" onClick={() => onEdit(item)}>Open editor <span>-&gt;</span></button>
    </article>
  )
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default ContentCard