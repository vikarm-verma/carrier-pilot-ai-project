function OpportunitySearch({ values, onChange, onSearch, onReset }) {
  const update = (field, value) => onChange({ ...values, [field]: value })
  return (
    <form className="opportunity-search-form" onSubmit={(event) => { event.preventDefault(); onSearch() }}>
      <div className="opportunity-search-fields"><label>Keyword / role<input value={values.keyword} onChange={(event) => update('keyword', event.target.value)} placeholder="Java developer, AI engineer..." /></label><label>Location<input value={values.location} onChange={(event) => update('location', event.target.value)} placeholder="Remote, Jaipur, India..." /></label><label>Company<input value={values.company} onChange={(event) => update('company', event.target.value)} placeholder="Search company" /></label></div>
      <div className="opportunity-search-actions"><button className="primary-button" type="submit">Search opportunities <span>-&gt;</span></button><button className="quiet-button" type="button" onClick={onReset}>Clear</button></div>
    </form>
  )
}

export default OpportunitySearch