import { useEffect, useState } from 'react'
import ApplicationDetails from '../components/applications/ApplicationDetails'
import ApplicationFilters from '../components/applications/ApplicationFilters'
import ApplicationForm from '../components/applications/ApplicationForm'
import ApplicationList from '../components/applications/ApplicationList'
import ApplicationPipeline from '../components/applications/ApplicationPipeline'
import ApplicationStats from '../components/applications/ApplicationStats'
import FollowUpPanel from '../components/applications/FollowUpPanel'
import { createId, emptyApplication, readStorage } from '../components/applications/applicationData'
import { defaultContacts } from '../components/outreach/outreachData'

const APPLICATIONS_KEY = 'careerpilot_applications'
const DRAFT_KEY = 'careerpilot_application_draft'
const CONTACTS_KEY = 'careerpilot_outreach_contacts'
const OPPORTUNITIES_KEY = 'careerpilot_opportunities'
const emptyFilters = { search: '', status: 'All', workMode: 'All', source: 'All', sort: 'updated-desc' }

function Applications() {
  const [applications, setApplications] = useState(() => readStorage(APPLICATIONS_KEY, []).map((item) => ({ ...emptyApplication, ...item })))
  const [contacts] = useState(() => readStorage(CONTACTS_KEY, defaultContacts))
  const [savedOpportunities] = useState(() => readStorage(OPPORTUNITIES_KEY, []))
  const [filters, setFilters] = useState(emptyFilters)
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(() => readStorage(DRAFT_KEY, null))
  const [showForm, setShowForm] = useState(() => Boolean(readStorage(DRAFT_KEY, null)))
  useEffect(() => { if (editing) window.localStorage.removeItem(DRAFT_KEY) }, [editing])
  const persist = (next) => { setApplications(next); window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next)) }
  const save = (data) => { const timestamp = new Date().toISOString(); const existing = editing?.id; const application = { ...emptyApplication, ...data, opportunitySnapshot: data.opportunitySnapshot || editing?.opportunitySnapshot || null, id: existing || createId('application'), createdAt: editing?.createdAt || timestamp, updatedAt: timestamp }; persist(existing ? applications.map((item) => item.id === application.id ? application : item) : [application, ...applications]); setEditing(null); setShowForm(false); setSelected(application) }
  const remove = (id) => { if (window.confirm('Delete this application?')) { persist(applications.filter((item) => item.id !== id)); if (selected?.id === id) setSelected(null) } }
  const updateStatus = (application, status) => { const next = { ...application, status, updatedAt: new Date().toISOString() }; persist(applications.map((item) => item.id === application.id ? next : item)); if (selected?.id === application.id) setSelected(next) }
  const openForm = (application = null) => { setEditing(application); setShowForm(true); setSelected(null) }
  const filtered = sortApplications(applications.filter((application) => { const query = filters.search.toLowerCase(); return (filters.status === 'All' || application.status === filters.status) && (filters.workMode === 'All' || application.workMode === filters.workMode) && (filters.source === 'All' || application.source === filters.source) && (!query || `${application.jobTitle} ${application.company}`.toLowerCase().includes(query)) }), filters.sort)
  const today = new Date().toISOString().slice(0, 10)
  const counts = { total: applications.length, applied: applications.filter((item) => item.status === 'Applied').length, screening: applications.filter((item) => item.status === 'Screening').length, interviewing: applications.filter((item) => item.status === 'Interviewing').length, offers: applications.filter((item) => item.status === 'Offer').length, rejected: applications.filter((item) => item.status === 'Rejected').length, withdrawn: applications.filter((item) => item.status === 'Withdrawn').length, followUps: applications.filter((item) => item.nextFollowUpDate && item.nextFollowUpDate <= today && !['Rejected', 'Withdrawn'].includes(item.status)).length }
  const modes = [...new Set(applications.map((item) => item.workMode).filter(Boolean))].sort()
  const sources = [...new Set(applications.map((item) => item.source).filter(Boolean))].sort()
  const selectedOpportunity = selected?.opportunitySnapshot || savedOpportunities.find((item) => item.opportunity?.id === selected?.opportunityId)?.opportunity || null

  if (selected && !showForm) return <main className="dashboard-content application-page"><ApplicationDetails application={selected} opportunity={selectedOpportunity} onBack={() => setSelected(null)} onEdit={() => openForm(selected)} onDelete={remove} onStatusChange={updateStatus} /></main>

  return <main className="dashboard-content application-page"><div className="application-page-heading"><div><p className="eyebrow accent-eyebrow">Search command center</p><h2>Application Tracker</h2><p>Keep every role, conversation, and next move visible from one focused workspace.</p></div><button className="primary-button" type="button" onClick={() => openForm()}>Add application <span>+</span></button></div><ApplicationStats counts={counts} />{showForm && <ApplicationForm application={editing} contacts={contacts} onSave={save} onCancel={() => { setEditing(null); setShowForm(false) }} />}<ApplicationPipeline applications={applications} onOpen={setSelected} /><div className="application-main-grid"><div><section className="panel application-filter-panel"><ApplicationFilters filters={filters} workModes={modes} sources={sources} onChange={setFilters} onReset={() => setFilters(emptyFilters)} /></section><ApplicationList applications={filtered} onOpen={setSelected} onEdit={openForm} onDelete={remove} onStatusChange={updateStatus} /></div><FollowUpPanel applications={applications} onOpen={setSelected} /></div></main>
}

function sortApplications(applications, sort) { return [...applications].sort((left, right) => { if (sort === 'application-desc') return new Date(right.applicationDate || 0) - new Date(left.applicationDate || 0); if (sort === 'follow-up-asc') return (left.nextFollowUpDate || '9999-12-31').localeCompare(right.nextFollowUpDate || '9999-12-31'); if (sort === 'company-asc') return left.company.localeCompare(right.company); if (sort === 'job-asc') return left.jobTitle.localeCompare(right.jobTitle); return new Date(right.updatedAt) - new Date(left.updatedAt) }) }

export default Applications
