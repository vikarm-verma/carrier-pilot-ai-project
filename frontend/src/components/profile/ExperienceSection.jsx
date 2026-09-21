import ProfileSection from './ProfileSection'
import { emptyExperience } from './profileDefaults'

function ExperienceSection({ items, isEditing, onChange, onAdd, onRemove }) {
  return (
    <ProfileSection eyebrow="Career journey" title="Experience" action={isEditing && <button className="small-action" type="button" onClick={() => onAdd(emptyExperience)}>+ Add experience</button>}>
      {items.length === 0 && <p className="empty-copy">Add your work experience to give future recommendations useful context.</p>}
      <div className="profile-entry-list">
        {items.map((item, index) => (
          <div className="profile-entry" key={`${item.company}-${index}`}>
            {isEditing ? (
              <div className="entry-form">
                <div className="form-grid form-grid-three">
                  <input value={item.title} onChange={(event) => onChange(index, 'title', event.target.value)} placeholder="Job title" aria-label="Job title" />
                  <input value={item.company} onChange={(event) => onChange(index, 'company', event.target.value)} placeholder="Company" aria-label="Company" />
                  <input value={item.startDate} onChange={(event) => onChange(index, 'startDate', event.target.value)} placeholder="Start date" aria-label="Start date" />
                </div>
                <div className="form-grid form-grid-two">
                  <input value={item.endDate} disabled={item.current} onChange={(event) => onChange(index, 'endDate', event.target.value)} placeholder="End date" aria-label="End date" />
                  <label className="checkbox-label"><input type="checkbox" checked={item.current} onChange={(event) => onChange(index, 'current', event.target.checked)} /> Currently working here</label>
                </div>
                <textarea value={item.description} onChange={(event) => onChange(index, 'description', event.target.value)} placeholder="Describe your impact" aria-label="Experience description" rows="3" />
                <button className="remove-button" type="button" onClick={() => onRemove(index)}>Remove experience</button>
              </div>
            ) : (
              <>
                <div><h3>{item.title || 'Untitled role'}</h3><p>{item.company || 'Company not added'}</p></div>
                <span className="entry-date">{item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}</span>
                {item.description && <p className="entry-description">{item.description}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    </ProfileSection>
  )
}

export default ExperienceSection
