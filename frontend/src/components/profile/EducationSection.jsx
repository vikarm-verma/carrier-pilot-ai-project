import ProfileSection from './ProfileSection'
import { emptyEducation } from './profileDefaults'

function EducationSection({ items, isEditing, onChange, onAdd, onRemove }) {
  return (
    <ProfileSection
      eyebrow="Learning path"
      title="Education"
      action={
        isEditing && (
          <button
            className="small-action"
            type="button"
            onClick={() => onAdd({ ...emptyEducation })}
          >
            + Add education
          </button>
        )
      }
    >
      {items.length === 0 && (
        <p className="empty-copy">
          Add your education background.
        </p>
      )}

      <div className="profile-entry-list">
        {items.map((item, index) => (
          <div
            className="profile-entry"
            key={`education-${index}`}
          >
            {isEditing ? (
              <div className="entry-form">

                {/* Education Information */}
                <div className="form-grid form-grid-four">

                  <input
                    value={item.degree}
                    onChange={(event) =>
                      onChange(index, 'degree', event.target.value)
                    }
                    placeholder="Degree"
                    aria-label="Degree"
                  />

                  <input
                    value={item.institution}
                    onChange={(event) =>
                      onChange(index, 'institution', event.target.value)
                    }
                    placeholder="Institution"
                    aria-label="Institution"
                  />

                  <input
                    type="date"
                    value={item.startYear}
                    onChange={(event) =>
                      onChange(index, 'startYear', event.target.value)
                    }
                    aria-label="Education start date"
                  />

                  <input
                    type="date"
                    value={item.endYear}
                    onChange={(event) =>
                      onChange(index, 'endYear', event.target.value)
                    }
                    aria-label="Education end date"
                  />

                </div>

                {/* Remove */}
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => onRemove(index)}
                >
                  Remove education
                </button>

              </div>
            ) : (
              <>
                <div>
                  <h3>
                    {item.degree || 'Degree not added'}
                  </h3>

                  <p>
                    {item.institution || 'Institution not added'}
                  </p>
                </div>

                <span className="entry-date">
                  {item.startYear || 'Start'} -{' '}
                  {item.endYear || 'Present'}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </ProfileSection>
  )
}

export default EducationSection