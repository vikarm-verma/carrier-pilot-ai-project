function OpportunitySort({ value, onChange }) {
  return <label className="opportunity-sort">Sort by<select value={value} onChange={(event) => onChange(event.target.value)}><option value="relevance">Relevance</option><option value="recent">Most recent</option><option value="salary-high">Salary: high to low</option><option value="salary-low">Salary: low to high</option></select></label>
}

export default OpportunitySort