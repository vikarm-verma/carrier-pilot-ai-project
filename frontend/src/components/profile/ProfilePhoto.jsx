function ProfilePhoto({ photo, name, isEditing, onChange, onRemove }) {
  return (
    <div className="profile-photo-wrap">
      <div className="profile-photo" aria-label={photo ? 'Profile photo preview' : 'No profile photo'}>
        {photo ? <img src={photo} alt="Profile" /> : <span>{name ? name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() : 'AM'}</span>}
      </div>
      {isEditing && (
        <div className="photo-actions">
          <label className="secondary-button" htmlFor="profile-photo-input">{photo ? 'Change photo' : 'Add photo'}</label>
          {photo && <button className="quiet-button" type="button" onClick={onRemove}>Remove</button>}
          <input id="profile-photo-input" type="file" accept="image/*" onChange={onChange} />
        </div>
      )}
    </div>
  )
}

export default ProfilePhoto
