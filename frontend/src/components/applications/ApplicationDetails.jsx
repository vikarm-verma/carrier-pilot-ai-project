import { applicationStatuses, formatDate } from './applicationData'

function ApplicationDetails({ application, opportunity, onBack, onEdit, onDelete, onStatusChange }) {
  const contact = application.contactName || application.contactEmail || application.contactLinkedIn

  return (
    <section className="panel application-details">
      <div className="details-toolbar"><button className="quiet-button" type="button" onClick={onBack}>Back to applications</button><span className={`application-status status-${application.status.toLowerCase()}`}>{application.status}</span></div>
      <div className="details-heading"><div className="company-logo">{application.company.slice(0, 2).toUpperCase()}</div><div><p className="eyebrow accent-eyebrow">{application.company}</p><h2>{application.jobTitle}</h2><p>{application.location || 'Location not set'}{application.workMode ? ` · ${application.workMode}` : ''}{application.employmentType ? ` · ${application.employmentType}` : ''}</p></div></div>
      <div className="details-actions"><button className="primary-button" type="button" onClick={onEdit}>Edit application <span>-&gt;</span></button><select value={application.status} onChange={(event) => onStatusChange(application, event.target.value)} aria-label="Update application status">{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select>{contact ? <a className="secondary-button" href="#outreach">Go to Outreach</a> : null}<button className="remove-button" type="button" onClick={() => onDelete(application.id)}>Delete</button></div>
      <div className="details-facts"><span><strong>Application date</strong>{formatDate(application.applicationDate)}</span><span><strong>Follow-up</strong>{formatDate(application.nextFollowUpDate)}</span><span><strong>Interview</strong>{formatDate(application.interviewDate)}</span><span><strong>Source</strong>{application.source || 'Not set'}</span></div>
      <div className="details-grid"><div><h3>Job information</h3><p><strong>Salary:</strong> {application.salary || 'Not set'}</p><p><strong>Job URL:</strong> {application.jobUrl ? <a className="details-link" href={application.jobUrl} target="_blank" rel="noreferrer">Open listing</a> : 'Not set'}</p><h3>Application information</h3><p><strong>Created:</strong> {formatDate(application.createdAt?.slice(0, 10))}</p><p><strong>Last updated:</strong> {formatDate(application.updatedAt?.slice(0, 10))}</p></div><div><h3>Contact</h3><p>{application.contactName || 'No contact linked'}</p>{application.contactEmail ? <p>{application.contactEmail}</p> : null}{application.contactLinkedIn ? <p><a className="details-link" href={application.contactLinkedIn} target="_blank" rel="noreferrer">LinkedIn profile</a></p> : null}<h3>Opportunity reference</h3>{opportunity ? <p><a className="details-link" href="#opportunities">Go to Opportunity</a></p> : <p>{application.opportunityId || 'Not linked'}</p>}</div></div>
      <div className="application-detail-notes"><h3>Notes</h3><p>{application.notes || 'No notes added.'}</p></div>
    </section>
  )
}

export default ApplicationDetails
