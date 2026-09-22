function PersonalizationContext({ profile }) {
  const skills = profile.skills?.map((skill) => skill.name || skill).filter(Boolean) || []
  const experience = profile.experience?.[0]

  return <section className="panel personalization-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Personalization context</p><h2>Write from your signal</h2></div><span className="context-orb">AI</span></div><p className="context-description">Use this saved context to make each message specific. CareerPilot does not send messages.</p><dl className="context-list"><div><dt>Name</dt><dd>{profile.name || 'Not added'}</dd></div><div><dt>Headline</dt><dd>{profile.headline || 'Not added'}</dd></div><div><dt>Current role</dt><dd>{profile.role || 'Not added'}</dd></div><div><dt>About</dt><dd>{profile.about || 'Not added'}</dd></div><div><dt>Skills</dt><dd>{skills.length ? skills.join(' · ') : 'Not added'}</dd></div><div><dt>Target roles</dt><dd>{profile.preferences?.roles || 'Not added'}</dd></div><div><dt>Experience</dt><dd>{experience ? `${experience.title || 'Role'}${experience.company ? ` at ${experience.company}` : ''}` : 'Not added'}</dd></div></dl></section>
}

export default PersonalizationContext
