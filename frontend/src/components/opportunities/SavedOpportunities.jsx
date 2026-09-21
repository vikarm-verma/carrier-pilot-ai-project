function SavedOpportunities({ savedItems, onRemove, onDetails }) {
  return <section className="panel saved-opportunities-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Your shortlist</p><h2>Saved opportunities</h2></div><span className="content-count">{savedItems.length} saved</span></div>{savedItems.length ? <div className="saved-opportunity-list">{savedItems.map((saved) => <article className="saved-opportunity-row" key={saved.opportunity.id}><div><strong>{saved.opportunity.title}</strong><p>{saved.opportunity.company} · Saved {formatDate(saved.savedAt)}</p></div><span className="saved-status">{saved.status}</span><button className="small-action" type="button" onClick={() => onDetails(saved.opportunity)}>Review</button><button className="remove-button" type="button" onClick={() => onRemove(saved.opportunity.id)}>Remove</button></article>)}</div> : <p className="empty-copy">Your shortlist is empty. Save a promising opportunity to keep it in view.</p>}</section>
}

function formatDate(value) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) }

export default SavedOpportunities