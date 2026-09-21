import ProfilePhoto from './ProfilePhoto'

function ProfileHeader({ profile, completion, isEditing, onChange, onRemovePhoto }) {
  return (
    <section className="profile-hero panel">
      <div className="profile-hero-main">
        <ProfilePhoto photo={profile.photo} name={profile.name} isEditing={isEditing} onChange={onChange} onRemove={onRemovePhoto} />
        <div className="profile-identity">
          {isEditing ? (
            <>
              <input className="profile-name-input" value={profile.name} onChange={(event) => profile.update('name', event.target.value)} aria-label="Full name" placeholder="Full name" />
              <input className="profile-headline-input" value={profile.headline} onChange={(event) => profile.update('headline', event.target.value)} aria-label="Professional headline" placeholder="Professional headline" />
              <input className="profile-role-input" value={profile.role} onChange={(event) => profile.update('role', event.target.value)} aria-label="Current role" placeholder="Current role" />
            </>
          ) : (
            <>
              <h2>{profile.name || 'Your name'}</h2>
              <p className="profile-headline">{profile.headline || 'Add a professional headline'}</p>
              <p className="profile-role">{profile.role || 'Add your current role'}</p>
            </>
          )}
        </div>
      </div>
      <div className="completion-card">
        <div className="completion-topline"><span>Profile completion</span><strong>{completion}%</strong></div>
        <div className="completion-track"><span style={{ width: `${completion}%` }} /></div>
        <small>{completion >= 80 ? 'Your profile is ready to power your career search.' : 'Complete more fields to strengthen your career signal.'}</small>
      </div>
    </section>
  )
}

export default ProfileHeader
