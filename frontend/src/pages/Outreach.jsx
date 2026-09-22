import { useState } from 'react'
import ContactForm from '../components/outreach/ContactForm'
import ContactList from '../components/outreach/ContactList'
import FollowUpPanel from '../components/outreach/FollowUpPanel'
import OutreachComposer from '../components/outreach/OutreachComposer'
import OutreachHistory from '../components/outreach/OutreachHistory'
import OutreachStats from '../components/outreach/OutreachStats'
import OutreachTemplates from '../components/outreach/OutreachTemplates'
import PersonalizationContext from '../components/outreach/PersonalizationContext'
import TemplateForm from '../components/outreach/TemplateForm'
import { builtInTemplates, defaultContacts, defaultOutreach } from '../components/outreach/outreachData'

const OUTREACH_KEY = 'careerpilot_outreach'
const CONTACTS_KEY = 'careerpilot_outreach_contacts'
const TEMPLATES_KEY = 'careerpilot_outreach_templates'
const PROFILE_KEY = 'careerpilot_profile'
const OPPORTUNITY_KEY = 'careerpilot_opportunities'

function readStorage(key, fallback) {
  try { const saved = window.localStorage.getItem(key); return saved ? JSON.parse(saved) : fallback } catch { return fallback }
}

function getProfile() {
  const profile = readStorage(PROFILE_KEY, { name: '', headline: '', role: '', skills: [], experience: [], preferences: {} })
  return { ...profile, preferences: { roles: '', ...profile.preferences } }
}

function Outreach() {
  const [profile] = useState(getProfile)
  const [contacts, setContacts] = useState(() => readStorage(CONTACTS_KEY, defaultContacts))
  const [records, setRecords] = useState(() => readStorage(OUTREACH_KEY, defaultOutreach))
  const [customTemplates, setCustomTemplates] = useState(() => readStorage(TEMPLATES_KEY, []).filter((template) => !builtInTemplates.some((builtIn) => builtIn.id === template.id)))
  const [savedOpportunities] = useState(() => readStorage(OPPORTUNITY_KEY, []))
  const [contactSearch, setContactSearch] = useState('')
  const [historySearch, setHistorySearch] = useState('')
  const [historyFilters, setHistoryFilters] = useState({ status: 'All', messageType: 'All', contactId: 'All', sort: 'updated-desc' })
  const [selectedContactId, setSelectedContactId] = useState('')
  const [editingContact, setEditingContact] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [showComposer, setShowComposer] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [showTemplateForm, setShowTemplateForm] = useState(false)

  const persistContacts = (next) => { setContacts(next); window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(next)) }
  const persistRecords = (next) => { setRecords(next); window.localStorage.setItem(OUTREACH_KEY, JSON.stringify(next)) }
  const persistTemplates = (next) => { setCustomTemplates(next); window.localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next)) }
  const confirmDelete = (label, action) => { if (window.confirm(`Delete ${label}?`)) action() }
  const saveContact = (data) => {
    const contact = editingContact ? { ...editingContact, ...data } : { ...data, id: createId('contact') }
    persistContacts(editingContact ? contacts.map((item) => item.id === contact.id ? contact : item) : [contact, ...contacts])
    setEditingContact(null); setShowContactForm(false)
  }
  const deleteContact = (id) => confirmDelete('this contact', () => persistContacts(contacts.filter((contact) => contact.id !== id)))
  const saveRecord = (data) => {
    const contact = contacts.find((item) => item.id === data.contactId)
    const opportunity = savedOpportunities.find((item) => item.opportunity?.id === data.opportunityId)?.opportunity || null
    const timestamp = new Date().toISOString()
    const isEditing = Boolean(editingRecord?.id)
    if (!contact) return
    const record = { ...data, contactId: contact.id, contact, opportunityId: opportunity?.id || '', opportunity, id: editingRecord?.id || createId('outreach'), createdAt: editingRecord?.createdAt || timestamp, updatedAt: timestamp }
    persistRecords(isEditing ? records.map((item) => item.id === record.id ? record : item) : [record, ...records])
    setEditingRecord(null); setShowComposer(false)
  }
  const deleteRecord = (id) => confirmDelete('this outreach message', () => persistRecords(records.filter((record) => record.id !== id)))
  const saveTemplate = (data) => {
    const template = { ...data, id: editingTemplate?.id || createId('template') }
    persistTemplates(editingTemplate ? customTemplates.map((item) => item.id === template.id ? template : item) : [template, ...customTemplates])
    setEditingTemplate(null); setShowTemplateForm(false)
  }
  const deleteTemplate = (id) => confirmDelete('this template', () => persistTemplates(customTemplates.filter((template) => template.id !== id)))
  const useTemplate = (template) => { setEditingRecord({ ...template, id: null, contactId: selectedContactId || contacts[0]?.id || '', opportunityId: '', status: 'Draft', messageType: template.messageType, message: template.message }); setShowComposer(true) }
  const filteredContacts = contacts.filter((contact) => `${contact.name} ${contact.company} ${contact.jobTitle}`.toLowerCase().includes(contactSearch.toLowerCase()))
  const filteredRecords = sortRecords(records.filter((record) => { const contact = contacts.find((item) => item.id === record.contactId) || record.contact || {}; const query = historySearch.toLowerCase(); return (historyFilters.status === 'All' || record.status === historyFilters.status) && (historyFilters.messageType === 'All' || record.messageType === historyFilters.messageType) && (historyFilters.contactId === 'All' || record.contactId === historyFilters.contactId) && (!query || `${contact.name || ''} ${contact.company || ''} ${record.message || ''}`.toLowerCase().includes(query)) }).map((record) => ({ ...record, contact: contacts.find((contact) => contact.id === record.contactId) || record.contact })), historyFilters.sort)
  const today = new Date().toISOString().slice(0, 10)
  const counts = { contacts: contacts.length, drafts: records.filter((record) => record.status === 'Draft').length, sent: records.filter((record) => record.status === 'Sent').length, followUps: records.filter((record) => record.followUpDate && record.followUpDate <= today && !['Closed', 'Replied'].includes(record.status)).length, replied: records.filter((record) => record.status === 'Replied').length }
  const selectedContact = contacts.find((contact) => contact.id === selectedContactId)
  const opportunities = savedOpportunities.map((saved) => saved.opportunity).filter(Boolean)
  const templates = [...builtInTemplates, ...customTemplates]

  return <main className="dashboard-content outreach-page">
    <div className="outreach-page-heading"><div><p className="eyebrow accent-eyebrow">Relationship command center</p><h2>Outreach Assistant</h2><p>Keep every professional conversation thoughtful, organized, and ready for the next step.</p></div><div className="outreach-page-actions"><button className="secondary-button" type="button" onClick={() => { setEditingTemplate(null); setShowTemplateForm((current) => !current) }}>+ Template</button><button className="primary-button" type="button" onClick={() => { setEditingRecord(null); setShowComposer(true) }}>Compose message <span>+</span></button></div></div>
    <OutreachStats counts={counts} />
    <div className="outreach-top-grid"><ContactList contacts={filteredContacts} selectedId={selectedContactId} search={contactSearch} onSearch={setContactSearch} onSelect={(id) => { setSelectedContactId(id); setEditingRecord(null); setShowComposer(true) }} onEdit={(contact) => { setEditingContact(contact); setShowContactForm(true) }} onDelete={deleteContact} /><section className="panel outreach-contact-form-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Relationship map</p><h2>{showContactForm ? (editingContact ? 'Edit contact' : 'Add contact') : 'Add contact'}</h2></div><button className="small-action" type="button" onClick={() => { setEditingContact(null); setShowContactForm((current) => !current) }}>{showContactForm ? 'Close' : '+ Add contact'}</button></div>{showContactForm ? <ContactForm contact={editingContact} onSave={saveContact} onCancel={() => { setEditingContact(null); setShowContactForm(false) }} /> : <p className="empty-copy">Add the people who can expand your perspective, help you learn, or open a future door.</p>}</section></div>
    {showComposer && <OutreachComposer record={editingRecord} contacts={contacts} opportunities={opportunities} onSave={saveRecord} onCancel={() => { setShowComposer(false); setEditingRecord(null) }} />}
    {showTemplateForm && <section className="panel template-form-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Template builder</p><h2>{editingTemplate ? 'Edit template' : 'New template'}</h2></div></div><TemplateForm template={editingTemplate} onSave={saveTemplate} onCancel={() => { setEditingTemplate(null); setShowTemplateForm(false) }} /></section>}
    <div className="outreach-main-grid"><div className="outreach-primary-column"><OutreachHistory records={filteredRecords} filters={historyFilters} contacts={contacts} search={historySearch} onFiltersChange={setHistoryFilters} onSearch={setHistorySearch} onEdit={(record) => { setEditingRecord(record); setSelectedContactId(record.contactId); setShowComposer(true) }} onDelete={deleteRecord} /><OutreachTemplates templates={templates} builtInIds={builtInTemplates.map((template) => template.id)} onUse={useTemplate} onEdit={(template) => { setEditingTemplate(template); setShowTemplateForm(true) }} onDelete={deleteTemplate} /></div><div className="outreach-secondary-column"><FollowUpPanel records={records} /><PersonalizationContext profile={profile} />{selectedContact && <section className="panel selected-contact-panel"><p className="eyebrow accent-eyebrow">Selected contact</p><h2>{selectedContact.name}</h2><p>{selectedContact.jobTitle} at {selectedContact.company}</p><small>{selectedContact.notes || 'No notes added yet.'}</small></section>}</div></div>
  </main>
}

function createId(prefix) { return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}` }

function sortRecords(records, sort) {
  return [...records].sort((left, right) => {
    if (sort === 'updated-asc') return new Date(left.updatedAt) - new Date(right.updatedAt)
    if (sort === 'follow-up-asc') return (left.followUpDate || '9999-12-31').localeCompare(right.followUpDate || '9999-12-31')
    if (sort === 'contact-asc') return (left.contact?.name || '').localeCompare(right.contact?.name || '')
    return new Date(right.updatedAt) - new Date(left.updatedAt)
  })
}

export default Outreach
