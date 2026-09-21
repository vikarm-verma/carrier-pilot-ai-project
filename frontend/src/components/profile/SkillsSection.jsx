import ProfileSection from './ProfileSection'

function SkillsSection({ skills, isEditing, onChange, onAdd, onRemove }) {
  const addSkill = () => onAdd({ name: '', level: 'Intermediate' })

  return (
    <ProfileSection eyebrow="Your toolkit" title="Skills" action={isEditing && <button className="small-action" type="button" onClick={addSkill}>+ Add skill</button>}>
      {skills.length === 0 && <p className="empty-copy">Add the capabilities you want CareerPilot to recognize.</p>}
      <div className="skills-list">
        {skills.map((skill, index) => isEditing ? (
          <div className="skill-edit-row" key={`${skill.name}-${index}`}>
            <input value={skill.name} onChange={(event) => onChange(index, 'name', event.target.value)} placeholder="Skill name" aria-label="Skill name" />
            <select value={skill.level} onChange={(event) => onChange(index, 'level', event.target.value)} aria-label="Skill proficiency">
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
            </select>
            <button className="remove-button" type="button" onClick={() => onRemove(index)}>Remove</button>
          </div>
        ) : (
          <span className="skill-chip" key={`${skill.name}-${index}`}>{skill.name || 'Unnamed skill'}<small>{skill.level}</small></span>
        ))}
      </div>
    </ProfileSection>
  )
}

export default SkillsSection
