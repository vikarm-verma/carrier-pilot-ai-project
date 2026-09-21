const statuses = [['all', 'All'], ['idea', 'Ideas'], ['draft', 'Drafts'], ['scheduled', 'Scheduled'], ['published', 'Published']]

function ContentFilters({ status, category, search, categories, onStatusChange, onCategoryChange, onSearchChange }) {
  return (
    <div className="content-filters">
      <div className="filter-tabs" role="tablist" aria-label="Content status">
        {statuses.map(([value, label]) => <button className={status === value ? 'filter-tab filter-tab-active' : 'filter-tab'} type="button" role="tab" aria-selected={status === value} key={value} onClick={() => onStatusChange(value)}>{label}</button>)}
      </div>
      <div className="filter-controls"><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search content..." aria-label="Search content" /><select value={category} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter by category"><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    </div>
  )
}

export default ContentFilters