function OpportunityCard({ role, company, location, match, type }) {
  return (
    <article className="opportunity-card interactive-card">
      <div className="company-logo">{company.slice(0, 2).toUpperCase()}</div>
      <div className="opportunity-content">
        <div className="opportunity-heading">
          <div>
            <h3>{role}</h3>
            <p>{company}</p>
          </div>
          <button className="more-button" type="button" aria-label={`More options for ${role}`}>...</button>
        </div>
        <div className="opportunity-meta">
          <span>{location}</span>
          <span>{type}</span>
          <strong>{match}% match</strong>
        </div>
      </div>
    </article>
  )
}

export default OpportunityCard
