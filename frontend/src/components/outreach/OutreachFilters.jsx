const statuses = ['All', 'Draft', 'Ready', 'Sent', 'Replied', 'Follow-up Due', 'Closed']

function OutreachFilters({ active, onChange }) {
  return <div className="outreach-filter-tabs" role="tablist" aria-label="Outreach status filters">{statuses.map((status) => <button className={active === status ? 'filter-tab filter-tab-active' : 'filter-tab'} type="button" role="tab" aria-selected={active === status} key={status} onClick={() => onChange(status)}>{status}</button>)}</div>
}

export default OutreachFilters
