import { messageTypes } from './outreachData'

function TemplateForm({ template, onSave, onCancel }) {
  const value = template || { name: '', messageType: messageTypes[0], subject: '', message: '' }
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSave(Object.fromEntries(data.entries())) }
  return <form className="outreach-form template-form" onSubmit={submit}><div className="form-grid-two"><label>Template name<input name="name" defaultValue={value.name} required placeholder="e.g. Conference follow-up" /></label><label>Message type<select name="messageType" defaultValue={value.messageType}>{messageTypes.map((type) => <option key={type}>{type}</option>)}</select></label></div><label>Subject <span className="optional-label">optional</span><input name="subject" defaultValue={value.subject} /></label><label>Message<textarea name="message" defaultValue={value.message} rows="6" required /></label><div className="outreach-form-actions"><button className="quiet-button" type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">Save template <span>-&gt;</span></button></div></form>
}

export default TemplateForm
