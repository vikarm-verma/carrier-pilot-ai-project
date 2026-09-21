import { useState } from 'react'
import ContentCard from '../components/content/ContentCard'
import ContentEditor from '../components/content/ContentEditor'
import ContentFilters from '../components/content/ContentFilters'
import ContentIdeaCard from '../components/content/ContentIdeaCard'
import ContentIdeaForm from '../components/content/ContentIdeaForm'
import ContentStats from '../components/content/ContentStats'
import AIContentGenerator from '../components/content/AIContentGenerator'
import LinkedInPreview from '../components/content/LinkedInPreview'
import ProfileContext from '../components/content/ProfileContext'
import { categories } from '../components/content/contentOptions'

const CONTENT_KEY = 'careerpilot_content'
const PROFILE_KEY = 'careerpilot_profile'
const defaultContent = [
  { id: 'content-1', title: 'The human side of learning AI', description: 'A reflection on building a learning habit while technology changes quickly.', content: 'The most valuable AI skill I am building is not a prompt library. It is the habit of staying curious when the answer is not obvious.', category: 'AI & Technology', contentType: 'Text Post', status: 'published', priority: 'High', plannedDate: '', createdAt: '2026-09-03T09:00:00.000Z', updatedAt: '2026-09-15T09:00:00.000Z' },
  { id: 'content-2', title: 'Career lessons from a project in public', description: 'Share the process behind a recent build and the lessons it revealed.', content: 'Building in public has changed how I think about progress. The small, imperfect iterations are where the real learning happens.', category: 'Project Showcase', contentType: 'Project Showcase', status: 'scheduled', priority: 'Medium', plannedDate: '2026-09-28', createdAt: '2026-09-10T09:00:00.000Z', updatedAt: '2026-09-18T09:00:00.000Z' },
  { id: 'content-3', title: 'Three questions I ask before learning a new tool', description: 'A practical post for other early-career builders navigating a fast-moving field.', content: '', category: 'Career & Learning', contentType: 'Carousel', status: 'idea', priority: 'Medium', plannedDate: '', createdAt: '2026-09-19T09:00:00.000Z', updatedAt: '2026-09-19T09:00:00.000Z' },
  { id: 'content-4', title: 'What makes an AI workflow useful?', description: 'Explore the difference between automation and meaningful leverage.', content: 'A useful AI workflow does more than move fast. It gives you more room for the work that requires judgment, empathy, and imagination.', category: 'Industry Insights', contentType: 'Text Post', status: 'draft', priority: 'High', plannedDate: '', createdAt: '2026-09-17T09:00:00.000Z', updatedAt: '2026-09-20T09:00:00.000Z' },
]

function readStorage(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function getProfile() {
  return readStorage(PROFILE_KEY, { name: 'Alex Morgan', headline: 'Aspiring product designer building thoughtful digital experiences', role: 'Career builder · Open to new opportunities', photo: '', skills: [], preferences: { roles: '' } })
}

function createId(prefix = 'content') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function ContentPlanner() {
  const [items, setItems] = useState(() => readStorage(CONTENT_KEY, defaultContent))
  const [profile] = useState(getProfile)
  const [activeTab, setActiveTab] = useState('all')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [editorItem, setEditorItem] = useState(null)
  const [editorDraft, setEditorDraft] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [ideaToEdit, setIdeaToEdit] = useState(null)
  const [showIdeaForm, setShowIdeaForm] = useState(false)
  const [showAIGenerator, setShowAIGenerator] = useState(false)

  const persist = (nextItems) => {
    setItems(nextItems)
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(nextItems))
  }
  const closeEditor = () => { setEditorItem(null); setEditorDraft(null); setShowEditor(false) }
  const openEditor = (item = null) => { setEditorItem(item); setEditorDraft(item); setShowEditor(true) }
  const confirmDelete = (id) => {
    const item = items.find((contentItem) => contentItem.id === id)
    if (item && window.confirm(`Delete "${item.title}"?`)) persist(items.filter((contentItem) => contentItem.id !== id))
  }
  const saveIdea = (idea) => {
    const timestamp = new Date().toISOString()
    const nextItems = ideaToEdit ? items.map((item) => item.id === ideaToEdit.id ? { ...item, ...idea, updatedAt: timestamp } : item) : [{ ...idea, id: createId('idea'), content: '', status: 'idea', plannedDate: '', createdAt: timestamp, updatedAt: timestamp }, ...items]
    persist(nextItems)
    setIdeaToEdit(null)
    setShowIdeaForm(false)
  }
  const convertToDraft = (idea) => {
    const timestamp = new Date().toISOString()
    persist(items.map((item) => item.id === idea.id ? { ...item, status: 'draft', content: item.content || item.description, updatedAt: timestamp } : item))
  }
  const saveContent = (draft) => {
    const timestamp = new Date().toISOString()
    const nextItems = editorItem ? items.map((item) => item.id === editorItem.id ? { ...item, ...draft, updatedAt: timestamp } : item) : [{ ...draft, id: createId(), description: draft.content.slice(0, 120), priority: 'Medium', createdAt: timestamp, updatedAt: timestamp }, ...items]
    persist(nextItems)
    closeEditor()
  }
  const saveGeneratedDraft = (draft) => {
    const timestamp = new Date().toISOString()
    persist([{ ...draft, id: createId('ai-draft'), priority: 'Medium', createdAt: timestamp, updatedAt: timestamp }, ...items])
    setShowAIGenerator(false)
    setActiveTab('draft')
  }
  const openIdeaEditor = (idea) => { setIdeaToEdit(idea); setShowIdeaForm(true) }
  const visibleItems = items.filter((item) => {
    const matchesStatus = activeTab === 'all' || item.status === activeTab
    const matchesCategory = category === 'all' || item.category === category
    const query = search.toLowerCase().trim()
    return matchesStatus && matchesCategory && (!query || `${item.title} ${item.content} ${item.description}`.toLowerCase().includes(query))
  })
  const counts = items.reduce((result, item) => ({ ...result, total: result.total + 1, [item.status]: result[item.status] + 1 }), { total: 0, idea: 0, draft: 0, scheduled: 0, published: 0 })
  const ideas = items.filter((item) => item.status === 'idea')
  const previewItem = editorItem || items.find((item) => item.status === 'draft') || items[0]

  return (
    <main className="dashboard-content content-page">
      <div className="content-page-heading"><div><p className="eyebrow accent-eyebrow">Personal branding command center</p><h2>Content Assistant</h2><p>Turn your professional perspective into a consistent signal.</p></div><div className="content-page-actions"><button className="secondary-button" type="button" onClick={() => setShowAIGenerator((current) => !current)}>AI generator <span>AI</span></button><button className="primary-button" type="button" onClick={() => openEditor()}>Create post <span>+</span></button></div></div>
      <ContentStats counts={counts} />
      {showAIGenerator && <AIContentGenerator profile={profile} onSaveDraft={saveGeneratedDraft} onCancel={() => setShowAIGenerator(false)} />}

      <div className="content-main-grid">
        <div className="content-primary-column">
          <section className="panel content-section"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Ideas in orbit</p><h2>Content ideas</h2></div><button className="small-action" type="button" onClick={() => { setIdeaToEdit(null); setShowIdeaForm((current) => !current) }}>{showIdeaForm ? 'Close form' : '+ Add idea'}</button></div>{showIdeaForm && <ContentIdeaForm initialIdea={ideaToEdit} onSave={saveIdea} onCancel={() => { setShowIdeaForm(false); setIdeaToEdit(null) }} />}{ideas.length ? <div className="content-idea-grid">{ideas.map((idea) => <ContentIdeaCard key={idea.id} idea={idea} onEdit={openIdeaEditor} onDelete={confirmDelete} onConvert={convertToDraft} />)}</div> : <p className="empty-copy">No ideas match this moment. Add a thought and give it somewhere to grow.</p>}</section>
          {showEditor ? <ContentEditor item={editorItem} onSave={saveContent} onCancel={closeEditor} onDelete={(id) => { confirmDelete(id); closeEditor() }} /> : <section className="panel content-section"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Your working queue</p><h2>Content library</h2></div><span className="content-count">{visibleItems.length} items</span></div><ContentFilters status={activeTab} category={category} search={search} categories={categories} onStatusChange={setActiveTab} onCategoryChange={setCategory} onSearchChange={setSearch} />{visibleItems.length ? <div className="content-library-list">{visibleItems.map((item) => <ContentCard key={item.id} item={item} onEdit={openEditor} onDelete={confirmDelete} />)}</div> : <p className="empty-copy content-empty">Nothing matches those filters. Try a wider search or create a new post.</p>}</section>}
        </div>
        <div className="content-secondary-column"><LinkedInPreview profile={profile} content={showEditor ? (editorDraft || editorItem || { content: '' }) : previewItem} /><ProfileContext profile={profile} /></div>
      </div>
    </main>
  )
}

export default ContentPlanner
