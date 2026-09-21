import { useState } from 'react'
import CareerPreferences from '../components/profile/CareerPreferences'
import CertificationsSection from '../components/profile/CertificationsSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import ProfessionalLinks from '../components/profile/ProfessionalLinks'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileSection from '../components/profile/ProfileSection'
import SkillsSection from '../components/profile/SkillsSection'
import { emptyCertification, emptyEducation } from '../components/profile/profileDefaults'

const STORAGE_KEY = 'careerpilot_profile'

const defaultProfile = {
  name: 'Alex Morgan',
  headline: 'Aspiring product designer building thoughtful digital experiences',
  role: 'Career builder · Open to new opportunities',
  photo: '',
  about: '',
  experience: [],
  skills: [],
  preferences: { roles: '', locations: '', workMode: 'Remote', industries: '' },
  education: [],
  certifications: [],
  links: { linkedin: '', github: '', portfolio: '' },
}

function getSavedProfile() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

function calculateCompletion(profile) {
  const checks = [
    profile.name,
    profile.headline,
    profile.about,
    profile.photo,
    profile.experience.length,
    profile.skills.length,
    profile.preferences.roles || profile.preferences.locations || profile.preferences.industries,
    profile.education.length,
    profile.certifications.length,
    profile.links.linkedin || profile.links.github || profile.links.portfolio,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

function updateItem(items, index, field, value) {
  return items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item)
}

function Profile() {
  const [savedProfile, setSavedProfile] = useState(getSavedProfile)
  const [draft, setDraft] = useState(getSavedProfile)
  const [isEditing, setIsEditing] = useState(false)
  const completion = calculateCompletion(draft)

  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }))
  const updateNested = (section, field, value) => setDraft((current) => ({ ...current, [section]: { ...current[section], [field]: value } }))
  const updateCollection = (section, index, field, value) => setDraft((current) => ({ ...current, [section]: updateItem(current[section], index, field, value) }))
  const addToCollection = (section, item) => setDraft((current) => ({ ...current, [section]: [...current[section], { ...item }] }))
  const removeFromCollection = (section, index) => setDraft((current) => ({ ...current, [section]: current[section].filter((_, itemIndex) => itemIndex !== index) }))

  const startEditing = () => {
    setDraft(savedProfile)
    setIsEditing(true)
  }

  const saveChanges = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    setSavedProfile(draft)
    setIsEditing(false)
  }

  const cancelChanges = () => {
    setDraft(savedProfile)
    setIsEditing(false)
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      window.alert('Please choose an image file.')
      event.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => update('photo', reader.result)
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  return (
    <main className="dashboard-content profile-content">
      <div className="profile-page-heading">
        <div><p className="eyebrow accent-eyebrow">Your professional signal</p><h2>My Profile</h2><p>Build the career context that powers your future CareerPilot recommendations.</p></div>
        {isEditing ? <div className="profile-edit-actions"><button className="quiet-button" type="button" onClick={cancelChanges}>Cancel</button><button className="primary-button" type="button" onClick={saveChanges}>Save changes <span>-&gt;</span></button></div> : <button className="primary-button" type="button" onClick={startEditing}>Edit profile <span>-&gt;</span></button>}
      </div>

      <ProfileHeader profile={{ ...draft, update }} completion={completion} isEditing={isEditing} onChange={handlePhotoChange} onRemovePhoto={() => update('photo', '')} />

      <div className="profile-grid">
        <div className="profile-column">
          <ProfileSection eyebrow="Your story" title="About me">
            {isEditing ? <textarea className="about-input" value={draft.about} onChange={(event) => update('about', event.target.value)} placeholder="Share your professional story, strengths, and what motivates you." rows="6" aria-label="About me" /> : <p className="about-copy">{draft.about || 'Your professional summary will appear here. Click Edit profile to tell your story.'}</p>}
          </ProfileSection>
          <ExperienceSection items={draft.experience} isEditing={isEditing} onChange={(index, field, value) => updateCollection('experience', index, field, value)} onAdd={(item) => addToCollection('experience', item)} onRemove={(index) => removeFromCollection('experience', index)} />
          <EducationSection items={draft.education} isEditing={isEditing} onChange={(index, field, value) => updateCollection('education', index, field, value)} onAdd={(item = emptyEducation) => addToCollection('education', item)} onRemove={(index) => removeFromCollection('education', index)} />
        </div>
        <div className="profile-column">
          <SkillsSection skills={draft.skills} isEditing={isEditing} onChange={(index, field, value) => updateCollection('skills', index, field, value)} onAdd={(item) => addToCollection('skills', item)} onRemove={(index) => removeFromCollection('skills', index)} />
          <CareerPreferences preferences={draft.preferences} isEditing={isEditing} onChange={(field, value) => updateNested('preferences', field, value)} />
          <CertificationsSection items={draft.certifications} isEditing={isEditing} onChange={(index, field, value) => updateCollection('certifications', index, field, value)} onAdd={(item = emptyCertification) => addToCollection('certifications', item)} onRemove={(index) => removeFromCollection('certifications', index)} />
          <ProfessionalLinks links={draft.links} isEditing={isEditing} onChange={(field, value) => updateNested('links', field, value)} />
        </div>
      </div>
    </main>
  )
}

export default Profile
