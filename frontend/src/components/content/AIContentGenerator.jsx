// import { useState } from 'react'
// import ProfileContext from './ProfileContext'
// import { categories, contentTypes } from './contentOptions'
// import { generateMockPost } from './aiGeneration'

// const tones = ['Professional', 'Educational', 'Thought Leadership', 'Conversational', 'Inspirational']
// const audiences = ['Recruiters', 'Hiring Managers', 'Developers', 'AI Professionals', 'Technology Leaders', 'General LinkedIn Audience']
// const lengths = ['Short', 'Medium', 'Long']

// const initialForm = {
//   topic: '',
//   contentType: contentTypes[0],
//   category: categories[0],
//   tone: tones[0],
//   audience: audiences[0],
//   keyPoints: '',
//   desiredLength: lengths[1],
// }

// function AIContentGenerator({ profile, onSaveDraft, onCancel }) {
//   const [form, setForm] = useState(initialForm)
//   const [generated, setGenerated] = useState('')
//   const [isEditing, setIsEditing] = useState(false)
//   const [generationNumber, setGenerationNumber] = useState(0)

//   const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }))
//   const generate = (event) => {
//     event.preventDefault()
//     if (!form.topic.trim()) return
//     const nextNumber = generationNumber + 1
//     setGenerationNumber(nextNumber)
//     setGenerated(generateMockPost(form, profile, nextNumber))
//     setIsEditing(false)
//   }
//   const saveDraft = () => {
//     onSaveDraft({
//       title: form.topic.trim(),
//       description: `Demo AI draft for ${form.audience} in a ${form.tone.toLowerCase()} tone.`,
//       content: generated.trim(),
//       category: form.category,
//       contentType: form.contentType,
//       status: 'draft',
//       plannedDate: '',
//     })
//   }

//   return (
//     <section className="panel ai-generator-panel">
//       <div className="section-heading"><div><p className="eyebrow accent-eyebrow">Demo AI Generation</p><h2>Build a post with context</h2><p className="ai-generator-intro">Shape the brief, generate a starting point, then review it before saving.</p></div><button className="quiet-button" type="button" onClick={onCancel}>Close</button></div>
//       <div className="ai-generator-grid">
//         <form className="content-form ai-generator-form" onSubmit={generate}>
//           <div className="ai-step-heading"><span>01</span><div><strong>Define the signal</strong><small>Tell the demo generator what you want to say.</small></div></div>
//           <label>Topic<input value={form.topic} onChange={(event) => updateForm('topic', event.target.value)} placeholder="e.g. Building better habits with AI tools" required /></label>
//           <div className="form-grid-two"><label>Content type<select value={form.contentType} onChange={(event) => updateForm('contentType', event.target.value)}>{contentTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Category<select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div>
//           <div className="form-grid-two"><label>Tone<select value={form.tone} onChange={(event) => updateForm('tone', event.target.value)}>{tones.map((tone) => <option key={tone}>{tone}</option>)}</select></label><label>Target audience<select value={form.audience} onChange={(event) => updateForm('audience', event.target.value)}>{audiences.map((audience) => <option key={audience}>{audience}</option>)}</select></label></div>
//           <label>Key points<textarea value={form.keyPoints} onChange={(event) => updateForm('keyPoints', event.target.value)} placeholder="One point per line" rows="4" /></label>
//           <label>Desired length<select value={form.desiredLength} onChange={(event) => updateForm('desiredLength', event.target.value)}>{lengths.map((length) => <option key={length}>{length}</option>)}</select></label>
//           <div className="ai-form-actions"><button className="primary-button" type="submit">{generated ? 'Regenerate content' : 'Generate content'} <span>-&gt;</span></button></div>
//         </form>
//         <div className="ai-generator-context"><ProfileContext profile={profile} /><div className="ai-context-note"><span className="context-orb">AI</span><p>Future connected generation will use this profile context. Nothing is sent anywhere in this demo.</p></div></div>
//       </div>
//       {generated && <div className="ai-generated-draft"><div className="ai-step-heading"><span>02</span><div><strong>Review before saving</strong><small>Generated text stays in your control.</small></div><span className="demo-badge">Demo output</span></div><textarea className="ai-draft-textarea" value={generated} readOnly={!isEditing} onChange={(event) => setGenerated(event.target.value)} aria-label="Generated LinkedIn post" /><div className="ai-draft-footer"><span><strong>{generated.length}</strong> characters · <strong>{countWords(generated)}</strong> words</span><div className="content-form-actions"><button className="quiet-button" type="button" onClick={() => setGenerated('')}>Cancel</button><button className="small-action" type="button" onClick={() => setIsEditing((current) => !current)}>{isEditing ? 'Lock review' : 'Edit'}</button><button className="primary-button" type="button" onClick={saveDraft} disabled={!generated.trim()}>Save as draft <span>-&gt;</span></button></div></div></div>}
//     </section>
//   )
// }

// function countWords(value) {
//   return value.trim() ? value.trim().split(/\s+/).length : 0
// }

// export default AIContentGenerator

import { useState } from 'react'
import ProfileContext from './ProfileContext'
import { categories, contentTypes } from './contentOptions'

const N8N_CONTENT_WEBHOOK_URL =
  'http://localhost:5678/webhook-test/careerpilot/content'

const tones = [
  'Professional',
  'Educational',
  'Thought Leadership',
  'Conversational',
  'Inspirational',
]

const audiences = [
  'Recruiters',
  'Hiring Managers',
  'Developers',
  'AI Professionals',
  'Technology Leaders',
  'General LinkedIn Audience',
]

const lengths = [
  'Short',
  'Medium',
  'Long',
]

const initialForm = {
  topic: '',
  contentType: contentTypes[0],
  category: categories[0],
  tone: tones[0],
  audience: audiences[0],
  keyPoints: '',
  desiredLength: lengths[1],
}

function AIContentGenerator({
  profile,
  onSaveDraft,
  onCancel,
}) {
  const [form, setForm] =
    useState(initialForm)

  const [generated, setGenerated] =
    useState('')

  const [generatedHook, setGeneratedHook] =
    useState('')

  const [generatedCTA, setGeneratedCTA] =
    useState('')

  const [generatedHashtags, setGeneratedHashtags] =
    useState([])

  const [isEditing, setIsEditing] =
    useState(false)

  const [isGenerating, setIsGenerating] =
    useState(false)

  const [error, setError] =
    useState('')

  const updateForm = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const generate = async (event) => {
    event.preventDefault()

    if (!form.topic.trim()) {
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response =
        await fetch(
          N8N_CONTENT_WEBHOOK_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              topic: form.topic,

              contentType:
                form.contentType,

              category:
                form.category,

              tone:
                form.tone,

              audience:
                form.audience,

              keyPoints:
                form.keyPoints,

              desiredLength:
                form.desiredLength,

              profile: {
                name:
                  profile?.name || '',

                headline:
                  profile?.headline || '',

                role:
                  profile?.role || '',

                about:
                  profile?.about || '',

                skills:
                  profile?.skills || [],

                experience:
                  profile?.experience || [],

                education:
                  profile?.education || [],

                certifications:
                  profile?.certifications || [],

                preferences:
                  profile?.preferences || {},
              },
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

      /*
       * Expected n8n response:
       *
       * {
       *   success: true,
       *   post: "...",
       *   hook: "...",
       *   cta: "...",
       *   hashtags: ["#AI", "#Career"]
       * }
       */

      if (!data.post) {
        throw new Error(
          'No generated content was returned by n8n.'
        )
      }

      setGenerated(
        data.post
      )

      setGeneratedHook(
        data.hook || ''
      )

      setGeneratedCTA(
        data.cta || ''
      )

      setGeneratedHashtags(
        Array.isArray(data.hashtags)
          ? data.hashtags
          : []
      )

      setIsEditing(false)
    } catch (generationError) {
      console.error(
        'AI content generation failed:',
        generationError
      )

      setError(
        'Unable to generate content. Make sure n8n is running and the Content Generator workflow is active.'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const clearGeneratedContent = () => {
    setGenerated('')
    setGeneratedHook('')
    setGeneratedCTA('')
    setGeneratedHashtags([])
    setError('')
    setIsEditing(false)
  }

  const saveDraft = () => {
    if (!generated.trim()) {
      return
    }

    onSaveDraft({
      title:
        form.topic.trim(),

      description:
        `AI-generated ${form.contentType} for ${form.audience} in a ${form.tone.toLowerCase()} tone.`,

      content:
        generated.trim(),

      category:
        form.category,

      contentType:
        form.contentType,

      status:
        'draft',

      plannedDate:
        '',

      aiGenerated:
        true,

      aiHook:
        generatedHook,

      aiCTA:
        generatedCTA,

      aiHashtags:
        generatedHashtags,
    })
  }

  return (
    <section className="panel ai-generator-panel">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="section-heading">

        <div>
          <p className="eyebrow accent-eyebrow">
            CareerPilot AI
          </p>

          <h2>
            AI Content Generator
          </h2>

          <p className="ai-generator-intro">
            Create LinkedIn content using your
            professional profile, topic and
            audience context.
          </p>
        </div>

        <button
          className="quiet-button"
          type="button"
          onClick={onCancel}
        >
          Close
        </button>

      </div>


      {/* ==================================================
          GENERATOR
      ================================================== */}

      <div className="ai-generator-grid">

        <form
          className="content-form ai-generator-form"
          onSubmit={generate}
        >

          {/* STEP 01 */}

          <div className="ai-step-heading">

            <span>
              01
            </span>

            <div>
              <strong>
                Define the content
              </strong>

              <small>
                Tell CareerPilot what you want
                to communicate.
              </small>
            </div>

          </div>


          {/* TOPIC */}

          <label>
            Topic

            <input
              value={form.topic}
              onChange={(event) =>
                updateForm(
                  'topic',
                  event.target.value
                )
              }
              placeholder="e.g. How Agentic AI is changing software development"
              required
            />
          </label>


          {/* CONTENT TYPE + CATEGORY */}

          <div className="form-grid-two">

            <label>
              Content type

              <select
                value={form.contentType}
                onChange={(event) =>
                  updateForm(
                    'contentType',
                    event.target.value
                  )
                }
              >
                {contentTypes.map(
                  (type) => (
                    <option
                      key={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </label>


            <label>
              Category

              <select
                value={form.category}
                onChange={(event) =>
                  updateForm(
                    'category',
                    event.target.value
                  )
                }
              >
                {categories.map(
                  (item) => (
                    <option
                      key={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </label>

          </div>


          {/* TONE + AUDIENCE */}

          <div className="form-grid-two">

            <label>
              Tone

              <select
                value={form.tone}
                onChange={(event) =>
                  updateForm(
                    'tone',
                    event.target.value
                  )
                }
              >
                {tones.map(
                  (tone) => (
                    <option
                      key={tone}
                    >
                      {tone}
                    </option>
                  )
                )}
              </select>
            </label>


            <label>
              Target audience

              <select
                value={form.audience}
                onChange={(event) =>
                  updateForm(
                    'audience',
                    event.target.value
                  )
                }
              >
                {audiences.map(
                  (audience) => (
                    <option
                      key={audience}
                    >
                      {audience}
                    </option>
                  )
                )}
              </select>
            </label>

          </div>


          {/* KEY POINTS */}

          <label>
            Key points

            <textarea
              value={form.keyPoints}
              onChange={(event) =>
                updateForm(
                  'keyPoints',
                  event.target.value
                )
              }
              placeholder="One point per line"
              rows="4"
            />
          </label>


          {/* LENGTH */}

          <label>
            Desired length

            <select
              value={form.desiredLength}
              onChange={(event) =>
                updateForm(
                  'desiredLength',
                  event.target.value
                )
              }
            >
              {lengths.map(
                (length) => (
                  <option
                    key={length}
                  >
                    {length}
                  </option>
                )
              )}
            </select>
          </label>


          {/* ERROR */}

          {error && (
            <div className="analysis-error">

              <strong>
                AI generation failed
              </strong>

              <p>
                {error}
              </p>

            </div>
          )}


          {/* GENERATE BUTTON */}

          <div className="ai-form-actions">

            <button
              className="primary-button"
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating
                ? 'Generating...'
                : generated
                  ? 'Regenerate content'
                  : 'Generate with AI'}

              {!isGenerating && (
                <span>
                  -&gt;
                </span>
              )}

            </button>

          </div>

        </form>


        {/* ==================================================
            PROFILE CONTEXT
        ================================================== */}

        <div className="ai-generator-context">

          <ProfileContext
            profile={profile}
          />

          <div className="ai-context-note">

            <span className="context-orb">
              AI
            </span>

            <p>
              CareerPilot uses your professional
              context to create content that is
              aligned with your profile.
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          GENERATED CONTENT
      ================================================== */}

      {generated && (
        <div className="ai-generated-draft">

          {/* STEP 02 */}

          <div className="ai-step-heading">

            <span>
              02
            </span>

            <div>
              <strong>
                AI Generated Content
              </strong>

              <small>
                Review, edit and save your
                LinkedIn post.
              </small>
            </div>

            <span className="demo-badge">
              AI
            </span>

          </div>


          {/* HOOK */}

          {generatedHook && (
            <div className="ai-output-meta">

              <strong>
                Suggested Hook
              </strong>

              <p>
                {generatedHook}
              </p>

            </div>
          )}


          {/* POST */}

          <textarea
            className="ai-draft-textarea"
            value={generated}
            readOnly={!isEditing}
            onChange={(event) =>
              setGenerated(
                event.target.value
              )
            }
            aria-label="Generated LinkedIn post"
          />


          {/* CTA */}

          {generatedCTA && (
            <div className="ai-output-meta">

              <strong>
                Suggested CTA
              </strong>

              <p>
                {generatedCTA}
              </p>

            </div>
          )}


          {/* HASHTAGS */}

          {generatedHashtags.length > 0 && (
            <div className="ai-output-meta">

              <strong>
                Suggested Hashtags
              </strong>

              <div className="ai-hashtag-list">

                {generatedHashtags.map(
                  (
                    hashtag,
                    index
                  ) => (
                    <span
                      key={`${hashtag}-${index}`}
                    >
                      {hashtag}
                    </span>
                  )
                )}

              </div>

            </div>
          )}


          {/* FOOTER */}

          <div className="ai-draft-footer">

            <span>
              <strong>
                {generated.length}
              </strong>{' '}
              characters ·{' '}
              <strong>
                {countWords(generated)}
              </strong>{' '}
              words
            </span>


            <div className="content-form-actions">

              <button
                className="quiet-button"
                type="button"
                onClick={
                  clearGeneratedContent
                }
              >
                Clear
              </button>


              <button
                className="small-action"
                type="button"
                onClick={() =>
                  setIsEditing(
                    (current) =>
                      !current
                  )
                }
              >
                {isEditing
                  ? 'Lock review'
                  : 'Edit'}
              </button>


              <button
                className="primary-button"
                type="button"
                onClick={saveDraft}
                disabled={
                  !generated.trim()
                }
              >
                Save as draft
                <span>
                  -&gt;
                </span>
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  )
}

function countWords(value) {
  return value.trim()
    ? value.trim().split(/\s+/).length
    : 0
}

export default AIContentGenerator