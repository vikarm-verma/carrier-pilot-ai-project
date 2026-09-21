import { categories, contentTypes } from './contentOptions'

function ContentEditor({ item, onSave, onCancel, onDelete, onDraftChange }) {
  const isNew = !item
  const content = item || { title: '', category: categories[0], contentType: contentTypes[0], status: 'draft', plannedDate: '', content: '' }
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSave({
      title: data.get('title').trim(), category: data.get('category'), contentType: data.get('contentType'), status: data.get('status'), plannedDate: data.get('plannedDate'), content: data.get('content').trim(),
    })
  }
  const handleInput = (event) => {
    const data = new FormData(event.currentTarget)
    onDraftChange?.({ title: data.get('title'), category: data.get('category'), contentType: data.get('contentType'), status: data.get('status'), plannedDate: data.get('plannedDate'), content: data.get('content') })
  }

  return (
    <section className="panel content-editor-panel">
      <div className="section-heading"><div><p className="eyebrow accent-eyebrow">{isNew ? 'New signal' : 'Editing content'}</p><h2>{isNew ? 'Create a post' : 'Post editor'}</h2></div><button className="quiet-button" type="button" onClick={onCancel}>Close</button></div>
      <form className="content-form" onSubmit={handleSubmit} onInput={handleInput}>
        <label>Post title<input name="title" defaultValue={content.title} placeholder="Give this post a clear working title" required /></label>
        <div className="form-grid-three"><label>Category<select name="category" defaultValue={content.category}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Content type<select name="contentType" defaultValue={content.contentType}>{contentTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Status<select name="status" defaultValue={content.status}><option value="draft">Draft</option><option value="scheduled">Scheduled</option><option value="published">Published</option></select></label></div>
        <label>Planned date<input name="plannedDate" type="date" defaultValue={content.plannedDate} /></label>
        <label>Post content<textarea name="content" defaultValue={content.content} placeholder="Write the point of view you want your network to remember..." rows="10" required /></label>
        <div className="content-editor-footer"><span>Character count updates in the preview</span><div className="content-form-actions">{!isNew && <button className="remove-button" type="button" onClick={() => onDelete(content.id)}>Delete</button>}<button className="quiet-button" type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">{isNew ? 'Save draft' : 'Save changes'} <span>-&gt;</span></button></div></div>
      </form>
    </section>
  )
}

export default ContentEditor