function OpportunityCard({ opportunity, isSaved, onSave, onDetails }) {
  return (
    <article className="research-opportunity-card"><div className="research-card-topline"><div className="company-logo">{opportunity.company.slice(0, 2).toUpperCase()}</div><div className="research-card-title"><span className="research-kicker">{opportunity.experienceLevel}</span><h3>{opportunity.title}</h3><p>{opportunity.company}</p></div><button className={isSaved ? 'save-opportunity save-opportunity-active' : 'save-opportunity'} type="button" onClick={() => onSave(opportunity)} aria-pressed={isSaved} aria-label={isSaved ? `Remove ${opportunity.title} from saved opportunities` : `Save ${opportunity.title}`}>{isSaved ? 'Saved' : 'Save'}</button></div><div className="research-meta"><span>{opportunity.location}</span><span>{opportunity.workMode}</span><span>{opportunity.employmentType}</span></div><p className="research-description">{opportunity.description}</p><div className="research-skills">{opportunity.skills.slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}</div><div className="research-card-footer"><span>{formatSalary(opportunity)} · Posted {formatDate(opportunity.postedDate)}</span><button className="content-card-link" type="button" onClick={() => onDetails(opportunity)}>View details <span>-&gt;</span></button></div></article>
  )
}

function formatSalary(opportunity) { return `${opportunity.currency} ${(opportunity.salaryMin / 100000).toFixed(0)}L - ${(opportunity.salaryMax / 100000).toFixed(0)}L` }
function formatDate(value) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) }

export default OpportunityCard