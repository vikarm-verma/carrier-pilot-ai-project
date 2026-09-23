import ProfileSection from './ProfileSection'
import { emptyCertification } from './profileDefaults'

function CertificationsSection({
  items,
  isEditing,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <ProfileSection
      eyebrow="Proof of expertise"
      title="Certifications"
      action={
        isEditing && (
          <button
            className="small-action"
            type="button"
            onClick={() => onAdd({ ...emptyCertification })}
          >
            + Add certification
          </button>
        )
      }
    >
      {items.length === 0 && (
        <p className="empty-copy">
          Add certifications that support your professional signal.
        </p>
      )}

      <div className="profile-entry-list">
        {items.map((item, index) => (
          <div
            className="profile-entry"
            key={`certification-${index}`}
          >
            {isEditing ? (
              <div className="entry-form">

                {/* Certification Information */}
                <div className="form-grid form-grid-three">

                  <input
                    value={item.name}
                    onChange={(event) =>
                      onChange(index, 'name', event.target.value)
                    }
                    placeholder="Certification name"
                    aria-label="Certification name"
                  />

                  <input
                    value={item.organization}
                    onChange={(event) =>
                      onChange(
                        index,
                        'organization',
                        event.target.value
                      )
                    }
                    placeholder="Issuing organization"
                    aria-label="Issuing organization"
                  />

                  <input
                    type="date"
                    value={item.year}
                    onChange={(event) =>
                      onChange(index, 'year', event.target.value)
                    }
                    aria-label="Certification date"
                  />

                </div>

                {/* Remove */}
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => onRemove(index)}
                >
                  Remove certification
                </button>

              </div>
            ) : (
              <>
                <div>
                  <h3>
                    {item.name || 'Certification not added'}
                  </h3>

                  <p>
                    {item.organization ||
                      'Issuing organization not added'}
                  </p>
                </div>

                <span className="entry-date">
                  {item.year || 'Date not added'}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </ProfileSection>
  )
}

export default CertificationsSection