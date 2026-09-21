function OpportunityProfile({ profile }) {
  const skills = profile.skills?.map((skill) => skill.name || skill).filter(Boolean) || []
  const preferences = profile.preferences || {}
  const experience = profile.experience?.[0]
  return <section className="panel opportunity-profile-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Profile match context</p><h2>Your opportunity profile</h2></div><span className="context-orb">OP</span></div><p className="context-description">These saved preferences can guide future opportunity matching. No match score is calculated yet.</p><div className="opportunity-profile-grid"><div><span>Target roles</span><strong>{preferences.roles || 'Not added yet'}</strong></div><div><span>Key skills</span><strong>{skills.length ? skills.join(' · ') : 'Not added yet'}</strong></div><div><span>Preferred location</span><strong>{preferences.locations || 'Not added yet'}</strong></div><div><span>Work preference</span><strong>{preferences.workMode || 'Not added yet'}</strong></div><div><span>Experience</span><strong>{experience ? `${experience.title || 'Role'}${experience.company ? ` at ${experience.company}` : ''}` : 'Not added yet'}</strong></div></div></section>
}

export default OpportunityProfile