import { useEffect, useState } from 'react'

import {
  PROFILE_STORAGE_KEY,
  PROFILE_UPDATED_EVENT,
  getSavedProfile,
} from '../profile/profileStorage'

function getInitials(name) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean)

  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
  }

  return nameParts[0]?.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase() || '??'
}

function Header({ title, description }) {
  const [profile, setProfile] = useState(getSavedProfile)

  useEffect(() => {
    const updateProfile = () => setProfile(getSavedProfile())
    const handleStorageChange = (event) => {
      if (event.key === PROFILE_STORAGE_KEY) updateProfile()
    }

    window.addEventListener(PROFILE_UPDATED_EVENT, updateProfile)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, updateProfile)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const displayName = profile.name?.trim() || 'Your name'
  const displayRole = profile.role?.trim() || profile.headline?.trim() || 'Add your current role'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{description}</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="ai-status">
          <span className="status-dot" aria-hidden="true" />
          <span>AI systems online</span>
        </div>
        <button className="icon-button" type="button" aria-label="Open notifications">
          !
        </button>
        <div className="profile-chip">
          <span className="avatar">{getInitials(displayName)}</span>
          <span className="profile-copy">
            <strong>{displayName}</strong>
            <small>{displayRole}</small>
          </span>
          <span className="chevron" aria-hidden="true">+</span>
        </div>
      </div>
    </header>
  )
}

export default Header
