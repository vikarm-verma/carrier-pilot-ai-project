import ProfileSection from './ProfileSection'

function CareerPreferences({ preferences, isEditing, onChange }) {
  return (
    <ProfileSection eyebrow="Your direction" title="Career preferences">
      {isEditing ? (
        <div className="form-stack">
          <div className="form-grid form-grid-two">
            <input value={preferences.roles} onChange={(event) => onChange('roles', event.target.value)} placeholder="Target job roles" aria-label="Target job roles" />
            <input value={preferences.locations} onChange={(event) => onChange('locations', event.target.value)} placeholder="Preferred locations" aria-label="Preferred locations" />
          </div>
          <div className="form-grid form-grid-two">
            <select value={preferences.workMode} onChange={(event) => onChange('workMode', event.target.value)} aria-label="Work preference"><option>Remote</option><option>Hybrid</option><option>On-site</option></select>
            <input value={preferences.industries} onChange={(event) => onChange('industries', event.target.value)} placeholder="Preferred industries" aria-label="Preferred industries" />
          </div>
        </div>
      ) : (
        <div className="preference-grid"><div><span>Target roles</span><strong>{preferences.roles || 'Not added'}</strong></div><div><span>Locations</span><strong>{preferences.locations || 'Not added'}</strong></div><div><span>Work style</span><strong>{preferences.workMode || 'Not added'}</strong></div><div><span>Industries</span><strong>{preferences.industries || 'Not added'}</strong></div></div>
      )}
    </ProfileSection>
  )
}

export default CareerPreferences
