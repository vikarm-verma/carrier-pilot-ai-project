import ProfileSection from './ProfileSection'

function ProfessionalLinks({ links, isEditing, onChange }) {
  return (
    <ProfileSection eyebrow="Stay connected" title="Professional links">
      {isEditing ? <div className="form-stack"><input value={links.linkedin} onChange={(event) => onChange('linkedin', event.target.value)} placeholder="LinkedIn URL" aria-label="LinkedIn URL" /><input value={links.github} onChange={(event) => onChange('github', event.target.value)} placeholder="GitHub URL" aria-label="GitHub URL" /><input value={links.portfolio} onChange={(event) => onChange('portfolio', event.target.value)} placeholder="Portfolio URL" aria-label="Portfolio URL" /></div> : <div className="links-list"><a href={links.linkedin || '#'} target="_blank" rel="noreferrer">LinkedIn <span>{links.linkedin || 'Not added'}</span></a><a href={links.github || '#'} target="_blank" rel="noreferrer">GitHub <span>{links.github || 'Not added'}</span></a><a href={links.portfolio || '#'} target="_blank" rel="noreferrer">Portfolio <span>{links.portfolio || 'Not added'}</span></a></div>}
    </ProfileSection>
  )
}

export default ProfessionalLinks
