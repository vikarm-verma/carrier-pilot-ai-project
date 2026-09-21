function ContentIdeaCard({ idea, onEdit, onDelete, onConvert }) {
  return (
    <article className="content-idea-card">
      <div className="content-card-heading"><div><span className="content-kicker">{idea.priority} priority</span><h3>{idea.title}</h3></div><button className="more-button" type="button" onClick={() => onDelete(idea.id)} aria-label={`Delete ${idea.title}`}>x</button></div>
      <p>{idea.description}</p>
      <div className="content-meta"><span>{idea.category}</span><span>{idea.contentType}</span><time>{formatDate(idea.createdAt)}</time></div>
      <div className="content-card-actions"><button className="small-action" type="button" onClick={() => onEdit(idea)}>Edit</button><button className="small-action" type="button" onClick={() => onConvert(idea)}>Convert to draft</button></div>
    </article>
  )
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value))
}

export default ContentIdeaCard