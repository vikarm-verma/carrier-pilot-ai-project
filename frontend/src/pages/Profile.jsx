import { useState } from 'react'

import CareerPreferences from '../components/profile/CareerPreferences'
import CertificationsSection from '../components/profile/CertificationsSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import ProfessionalLinks from '../components/profile/ProfessionalLinks'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileSection from '../components/profile/ProfileSection'
import SkillsSection from '../components/profile/SkillsSection'

import {
  emptyCertification,
  emptyEducation,
} from '../components/profile/profileDefaults'

const STORAGE_KEY = 'careerpilot_profile'

const N8N_WEBHOOK_URL =
  'http://localhost:5678/webhook-test/careerpilot/profile'

const defaultProfile = {
  name: 'Alex Morgan',
  headline:
    'Aspiring product designer building thoughtful digital experiences',
  role: 'Career builder · Open to new opportunities',
  photo: '',
  about: '',
  experience: [],
  skills: [],
  preferences: {
    roles: '',
    locations: '',
    workMode: 'Remote',
    industries: '',
  },
  education: [],
  certifications: [],
  links: {
    linkedin: '',
    github: '',
    portfolio: '',
  },
}

function getSavedProfile() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return defaultProfile
    }

    const parsed = JSON.parse(saved)

    return {
      ...defaultProfile,
      ...parsed,

      preferences: {
        ...defaultProfile.preferences,
        ...(parsed.preferences || {}),
      },

      links: {
        ...defaultProfile.links,
        ...(parsed.links || {}),
      },

      experience: Array.isArray(parsed.experience)
        ? parsed.experience
        : [],

      skills: Array.isArray(parsed.skills)
        ? parsed.skills
        : [],

      education: Array.isArray(parsed.education)
        ? parsed.education
        : [],

      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
        : [],
    }
  } catch {
    return defaultProfile
  }
}

function calculateCompletion(profile) {
  const checks = [
    Boolean(profile.name?.trim()),
    Boolean(profile.headline?.trim()),
    Boolean(profile.about?.trim()),
    Boolean(profile.photo),
    profile.experience?.length > 0,
    profile.skills?.length > 0,
    Boolean(
      profile.preferences?.roles?.trim() ||
      profile.preferences?.locations?.trim() ||
      profile.preferences?.industries?.trim()
    ),
    profile.education?.length > 0,
    profile.certifications?.length > 0,
    Boolean(
      profile.links?.linkedin?.trim() ||
      profile.links?.github?.trim() ||
      profile.links?.portfolio?.trim()
    ),
  ]

  return Math.round(
    (checks.filter(Boolean).length / checks.length) * 100
  )
}

function updateItem(items, index, field, value) {
  return items.map((item, itemIndex) =>
    itemIndex === index
      ? {
          ...item,
          [field]: value,
        }
      : item
  )
}

/*
 * Convert Gemini's Markdown response into
 * separate Career Intelligence cards.
 *
 * Supports:
 *
 * ## 1. Career Summary
 *
 * ### 1. Career Summary
 *
 * 1. Career Summary
 *
 * and removes markdown artifacts.
 */
function formatCareerAnalysis(text) {
  if (!text) return []

  const cleanedText = text
    .replace(/\r/g, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^#+\s*Career Analysis\s*:?.*$/gim, '')
    .replace(/^#+\s*Career Intelligence Report\s*:?.*$/gim, '')
    .replace(/^\s*#\s*$/gm, '')
    .trim()

  /*
   * First try Markdown headings:
   *
   * ## 1. Career Summary
   */
  let sections = cleanedText
    .split(/(?=^#{1,6}\s*\d+\.\s+)/gm)
    .map((section) => section.trim())
    .filter(Boolean)

  /*
   * Fallback for:
   *
   * 1. Career Summary
   */
  if (sections.length <= 1) {
    sections = cleanedText
      .split(/(?=^\d+\.\s+)/gm)
      .map((section) => section.trim())
      .filter(Boolean)
  }

  return sections.map((section) => {
    const lines = section.split('\n')

    const headingLine = lines.shift() || ''

    const title = headingLine
      .replace(/^#{1,6}\s*\d+\.\s*/, '')
      .replace(/^\d+\.\s*/, '')
      .replace(/^#+\s*/, '')
      .trim()

    const content = lines
      .join('\n')
      .replace(/^\s*#+\s*$/gm, '')
      .trim()

    return {
      title,
      content,
    }
  })
}

function cleanAnalysisLine(line) {
  return line
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^[-*•]\s*/, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^#{1,6}\s*/, '')
    .trim()
}

function getAnalysisIcon(index) {
  const icons = [
    '🎯',
    '💪',
    '⚠️',
    '🚀',
    '📚',
    '🧭',
  ]

  return icons[index] || '✦'
}

function Profile() {
  const [savedProfile, setSavedProfile] =
    useState(getSavedProfile)

  const [draft, setDraft] =
    useState(getSavedProfile)

  const [isEditing, setIsEditing] =
    useState(false)

  const [isAnalyzing, setIsAnalyzing] =
    useState(false)

  const [careerAnalysis, setCareerAnalysis] =
    useState('')

  const [analysisError, setAnalysisError] =
    useState('')

  const completion =
    calculateCompletion(draft)

  const update = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateNested = (
    section,
    field,
    value
  ) => {
    setDraft((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  const updateCollection = (
    section,
    index,
    field,
    value
  ) => {
    setDraft((current) => ({
      ...current,
      [section]: updateItem(
        current[section],
        index,
        field,
        value
      ),
    }))
  }

  const addToCollection = (
    section,
    item
  ) => {
    setDraft((current) => ({
      ...current,
      [section]: [
        ...current[section],
        { ...item },
      ],
    }))
  }

  const removeFromCollection = (
    section,
    index
  ) => {
    setDraft((current) => ({
      ...current,
      [section]: current[section].filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }))
  }

  const startEditing = () => {
    setDraft(savedProfile)
    setIsEditing(true)
  }

  const saveChanges = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(draft)
    )

    setSavedProfile(draft)
    setIsEditing(false)

    setCareerAnalysis('')
    setAnalysisError('')
  }

  const cancelChanges = () => {
    setDraft(savedProfile)
    setIsEditing(false)
  }

  const handlePhotoChange = (event) => {
    const file =
      event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      window.alert(
        'Please choose an image file.'
      )

      event.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      update('photo', reader.result)
    }

    reader.readAsDataURL(file)

    event.target.value = ''
  }

  // ==================================================
  // CAREERPILOT AI ANALYSIS
  // ==================================================

  const handleCareerAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisError('')
    setCareerAnalysis('')

    try {
      const response = await fetch(
        N8N_WEBHOOK_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: draft.name,

            role: draft.role,

            headline: draft.headline,

            about: draft.about,

            experience:
              draft.experience || [],

            skills:
              draft.skills || [],

            preferences:
              draft.preferences || {},

            education:
              draft.education || [],

            certifications:
              draft.certifications || [],

            links:
              draft.links || {},
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        )
      }

      const data =
        await response.json()

      if (!data.analysis) {
        throw new Error(
          'No career analysis was returned.'
        )
      }

      setCareerAnalysis(
        data.analysis
      )
    } catch (error) {
      console.error(
        'Career analysis failed:',
        error
      )

      setAnalysisError(
        'Unable to connect to CareerPilot AI. Make sure n8n is running and the webhook is listening.'
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analysisSections =
    formatCareerAnalysis(
      careerAnalysis
    )

  return (
    <main className="dashboard-content profile-content">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="profile-page-heading">

        <div>
          <p className="eyebrow accent-eyebrow">
            Your professional signal
          </p>

          <h2>
            My Profile
          </h2>

          <p>
            Build the career context that powers your
            future CareerPilot recommendations.
          </p>
        </div>

        <div className="profile-edit-actions">

          {isEditing ? (
            <>
              <button
                className="quiet-button"
                type="button"
                onClick={cancelChanges}
              >
                Cancel
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={saveChanges}
              >
                Save changes
                <span>-&gt;</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="secondary-button"
                type="button"
                onClick={
                  handleCareerAnalysis
                }
                disabled={isAnalyzing}
              >
                {isAnalyzing
                  ? 'Analyzing...'
                  : 'Analyze My Career'}

                {!isAnalyzing && (
                  <span>✦</span>
                )}
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={
                  startEditing
                }
              >
                Edit profile
                <span>-&gt;</span>
              </button>
            </>
          )}

        </div>
      </div>

      {/* ==================================================
          PROFILE HEADER
      ================================================== */}

      <ProfileHeader
        profile={{
          ...draft,
          update,
        }}
        completion={completion}
        isEditing={isEditing}
        onChange={handlePhotoChange}
        onRemovePhoto={() =>
          update('photo', '')
        }
      />

      {/* ==================================================
          CAREERPILOT AI ANALYSIS
      ================================================== */}

      {(careerAnalysis ||
        analysisError ||
        isAnalyzing) && (
        <section className="career-analysis-card">

          <div className="analysis-header">

            <div>
              <p className="eyebrow accent-eyebrow">
                CareerPilot AI
              </p>

              <h3>
                Career Intelligence Report
              </h3>
            </div>

            {isAnalyzing && (
              <span className="analysis-status">
                AI is analyzing your profile...
              </span>
            )}

            {careerAnalysis &&
              !isAnalyzing &&
              !analysisError && (
                <span className="analysis-status">
                  AI Generated
                </span>
              )}

          </div>

          {/* ERROR */}

          {analysisError && (
            <div className="analysis-error">
              <strong>
                Career analysis could not be generated
              </strong>

              <p>
                {analysisError}
              </p>
            </div>
          )}

          {/* LOADING */}

          {isAnalyzing &&
            !careerAnalysis && (
              <div className="analysis-loading">

                <div className="analysis-loading-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    Analyzing your career profile
                  </strong>

                  <p>
                    Reviewing your skills,
                    experience, education,
                    certifications and
                    career preferences...
                  </p>
                </div>

              </div>
            )}

          {/* RESULTS */}

          {careerAnalysis &&
            !isAnalyzing &&
            !analysisError && (
              <div className="analysis-results">

                {analysisSections.map(
                  (
                    section,
                    index
                  ) => (
                    <article
                      className="analysis-card"
                      key={`${section.title}-${index}`}
                    >

                      <div className="analysis-card-icon">
                        {getAnalysisIcon(index)}
                      </div>

                      <div className="analysis-card-body">

                        <h4>
                          {section.title}
                        </h4>

                        <div className="analysis-card-content">

                          {section.content
                            .split(/\n+/)
                            .map(
                              (
                                line,
                                lineIndex
                              ) => {
                                const cleanedLine =
                                  cleanAnalysisLine(
                                    line
                                  )

                                if (
                                  !cleanedLine
                                ) {
                                  return null
                                }

                                return (
                                  <p
                                    key={
                                      lineIndex
                                    }
                                  >
                                    {cleanedLine}
                                  </p>
                                )
                              }
                            )}

                        </div>

                      </div>

                    </article>
                  )
                )}

              </div>
            )}

        </section>
      )}

      {/* ==================================================
          PROFILE CONTENT
      ================================================== */}

      <div className="profile-grid">

        {/* ==================================================
            LEFT COLUMN
        ================================================== */}

        <div className="profile-column">

          <ProfileSection
            eyebrow="Your story"
            title="About me"
          >

            {isEditing ? (
              <textarea
                className="about-input"
                value={draft.about}
                onChange={(event) =>
                  update(
                    'about',
                    event.target.value
                  )
                }
                placeholder="Share your professional story, strengths, and what motivates you."
                rows="6"
                aria-label="About me"
              />
            ) : (
              <p className="about-copy">
                {draft.about ||
                  'Your professional summary will appear here. Click Edit profile to tell your story.'}
              </p>
            )}

          </ProfileSection>

          <ExperienceSection
            items={draft.experience}
            isEditing={isEditing}
            onChange={(
              index,
              field,
              value
            ) =>
              updateCollection(
                'experience',
                index,
                field,
                value
              )
            }
            onAdd={(item) =>
              addToCollection(
                'experience',
                item
              )
            }
            onRemove={(index) =>
              removeFromCollection(
                'experience',
                index
              )
            }
          />

          <EducationSection
            items={draft.education}
            isEditing={isEditing}
            onChange={(
              index,
              field,
              value
            ) =>
              updateCollection(
                'education',
                index,
                field,
                value
              )
            }
            onAdd={(
              item = emptyEducation
            ) =>
              addToCollection(
                'education',
                item
              )
            }
            onRemove={(index) =>
              removeFromCollection(
                'education',
                index
              )
            }
          />

        </div>

        {/* ==================================================
            RIGHT COLUMN
        ================================================== */}

        <div className="profile-column">

          <SkillsSection
            skills={draft.skills}
            isEditing={isEditing}
            onChange={(
              index,
              field,
              value
            ) =>
              updateCollection(
                'skills',
                index,
                field,
                value
              )
            }
            onAdd={(item) =>
              addToCollection(
                'skills',
                item
              )
            }
            onRemove={(index) =>
              removeFromCollection(
                'skills',
                index
              )
            }
          />

          <CareerPreferences
            preferences={
              draft.preferences
            }
            isEditing={isEditing}
            onChange={(
              field,
              value
            ) =>
              updateNested(
                'preferences',
                field,
                value
              )
            }
          />

          <CertificationsSection
            items={
              draft.certifications
            }
            isEditing={isEditing}
            onChange={(
              index,
              field,
              value
            ) =>
              updateCollection(
                'certifications',
                index,
                field,
                value
              )
            }
            onAdd={(
              item = emptyCertification
            ) =>
              addToCollection(
                'certifications',
                item
              )
            }
            onRemove={(index) =>
              removeFromCollection(
                'certifications',
                index
              )
            }
          />

          <ProfessionalLinks
            links={draft.links}
            isEditing={isEditing}
            onChange={(
              field,
              value
            ) =>
              updateNested(
                'links',
                field,
                value
              )
            }
          />

        </div>

      </div>

    </main>
  )
}

export default Profile