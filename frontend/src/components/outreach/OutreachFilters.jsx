import { messageTypes, outreachStatuses } from './outreachData'

function OutreachFilters({ filters, contacts, onChange }) {
  const update = (field, value) => onChange({ ...filters, [field]: value })

  return <div className="outreach-filter-controls">
    <label>Status<select value={filters.status} onChange={(event) => update('status', event.target.value)}><option value="All">All statuses</option>{outreachStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
    <label>Message type<select value={filters.messageType} onChange={(event) => update('messageType', event.target.value)}><option value="All">All message types</option>{messageTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
    <label>Contact<select value={filters.contactId} onChange={(event) => update('contactId', event.target.value)}><option value="All">All contacts</option>{contacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.name}</option>)}</select></label>
    <label>Sort<select value={filters.sort} onChange={(event) => update('sort', event.target.value)}><option value="updated-desc">Recently updated</option><option value="updated-asc">Oldest updated</option><option value="follow-up-asc">Follow-up date</option><option value="contact-asc">Contact name</option></select></label>
  </div>
}

export default OutreachFilters
