import { applicationStatuses } from './applicationData'

function ApplicationPipeline({ applications, onOpen }) {
  return <section className="panel application-pipeline-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Momentum map</p><h2>Application pipeline</h2></div><span className="content-count">Open a card to update it</span></div><div className="application-pipeline">{applicationStatuses.map((status) => { const items = applications.filter((application) => application.status === status); return <div className={`pipeline-column pipeline-${status.toLowerCase()}`} key={status}><h3>{status}<span>{items.length}</span></h3><div>{items.length ? items.map((application) => <button type="button" className="pipeline-card" onClick={() => onOpen(application)} key={application.id}><strong>{application.jobTitle}</strong><span>{application.company}</span></button>) : <p>Nothing here</p>}</div></div> })}</div></section>
}

export default ApplicationPipeline
