function ProfileContext({ profile }) {
  const skills = profile.skills?.slice(0, 4).map((skill) => skill.name || skill).filter(Boolean) || []
  const latestExperience = profile.experience?.[0]
  const experienceLabel = latestExperience ? `${latestExperience.title || 'Role'}${latestExperience.company ? ` at ${latestExperience.company}` : ''}` : 'Add experience in My Profile'
  return (
    <section className="panel profile-context-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Personalization layer</p><h2>Profile context</h2></div><span className="context-orb">AI</span></div><p className="context-description">Your career context will help future AI suggestions sound like you.</p><dl className="context-list"><div><dt>Headline</dt><dd>{profile.headline || 'Add a headline in My Profile'}</dd></div><div><dt>Current role</dt><dd>{profile.role || 'Add your current role in My Profile'}</dd></div><div><dt>About</dt><dd>{profile.about || 'Add an about summary in My Profile'}</dd></div><div><dt>Experience</dt><dd>{experienceLabel}</dd></div><div><dt>Top skills</dt><dd>{skills.length ? skills.join(' · ') : 'Add skills in My Profile'}</dd></div><div><dt>Target roles</dt><dd>{profile.preferences?.roles || 'Add target roles in My Profile'}</dd></div></dl></section>
  )
}

export default ProfileContext