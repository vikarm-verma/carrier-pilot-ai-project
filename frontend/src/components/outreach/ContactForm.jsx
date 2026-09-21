import { contactTypes } from './outreachData'

function ContactForm({ contact, onSave, onCancel }) {
  const value = contact || { name: '', jobTitle: '', company: '', contactType: contactTypes[0], linkedinUrl: '', email: '', notes: '' }
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSave(Object.fromEntries(data.entries())) }
  return <form className="outreach-form" onSubmit={submit}><div className="form-grid-two"><label>Name<input name="name" defaultValue={value.name} required placeholder="Full name" /></label><label>Job title<input name="jobTitle" defaultValue={value.jobTitle} required placeholder="Role or title" /></label></div><div className="form-grid-two"><label>Company<input name="company" defaultValue={value.company} required placeholder="Company" /></label><label>Contact type<select name="contactType" defaultValue={value.contactType}>{contactTypes.map((type) => <option key={type}>{type}</option>)}</select></label></div><div className="form-grid-two"><label>LinkedIn URL<input name="linkedinUrl" type="url" defaultValue={value.linkedinUrl} placeholder="https://linkedin.com/in/..." /></label><label>Email<input name="email" type="email" defaultValue={value.email} placeholder="name@company.com" /></label></div><label>Notes<textarea name="notes" defaultValue={value.notes} rows="3" placeholder="Context worth remembering" /></label><div className="outreach-form-actions"><button className="quiet-button" type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">Save contact <span>-&gt;</span></button></div></form>
}

export default ContactForm
