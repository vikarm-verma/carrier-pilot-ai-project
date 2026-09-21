import ProfileSection from './ProfileSection'
import { emptyEducation } from './profileDefaults'

function EducationSection({ items, isEditing, onChange, onAdd, onRemove }) {
  return (
    <ProfileSection eyebrow="Learning path" title="Education" action={isEditing && <button className="small-action" type="button" onClick={() => onAdd(emptyEducation)}>+ Add education</button>}>
      {items.length === 0 && <p className="empty-copy">Add your education background.</p>}
      <div className="profile-entry-list">
        {items.map((item, index) => <div className="profile-entry" key={`${item.institution}-${index}`}>
          {isEditing ? <div className="entry-form"><div className="form-grid form-grid-four"><input value={item.degree} onChange={(event) => onChange(index, 'degree', event.target.value)} placeholder="Degree" aria-label="Degree" /><input value={item.institution} onChange={(event) => onChange(index, 'institution', event.target.value)} placeholder="Institution" aria-label="Institution" /><input value={item.startYear} onChange={(event) => onChange(index, 'startYear', event.target.value)} placeholder="Start year" aria-label="Start year" /><input value={item.endYear} onChange={(event) => onChange(index, 'endYear', event.target.value)} placeholder="End year" aria-label="End year" /></div><button className="remove-button" type="button" onClick={() => onRemove(index)}>Remove education</button></div> : <><div><h3>{item.degree || 'Degree not added'}</h3><p>{item.institution || 'Institution not added'}</p></div><span className="entry-date">{item.startYear || 'Start'} - {item.endYear || 'Present'}</span></>}
        </div>)}
      </div>
    </ProfileSection>
  )
}

export default EducationSection
