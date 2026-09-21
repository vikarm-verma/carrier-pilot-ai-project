import { categories, contentTypes } from './contentOptions'

const priorities = ['Low', 'Medium', 'High']

function ContentIdeaForm({ initialIdea, onSave, onCancel }) {
  const idea = initialIdea || { title: '', description: '', category: categories[0], contentType: contentTypes[0], priority: 'Medium' }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSave({
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      category: formData.get('category'),
      contentType: formData.get('contentType'),
      priority: formData.get('priority'),
    })
  }

  return (
    <form className="content-form" onSubmit={handleSubmit}>
      <div className="form-grid-two">
        <label>Title / topic<input name="title" defaultValue={idea.title} placeholder="e.g. What I learned building my first AI workflow" required /></label>
        <label>Priority<select name="priority" defaultValue={idea.priority}>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></label>
      </div>
      <label>Short description<textarea name="description" defaultValue={idea.description} placeholder="Capture the angle, audience, or takeaway." rows="3" required /></label>
      <div className="form-grid-two">
        <label>Category<select name="category" defaultValue={idea.category}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Suggested content type<select name="contentType" defaultValue={idea.contentType}>{contentTypes.map((contentType) => <option key={contentType}>{contentType}</option>)}</select></label>
      </div>
      <div className="content-form-actions"><button className="quiet-button" type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">Save idea <span>-&gt;</span></button></div>
    </form>
  )
}

export default ContentIdeaForm