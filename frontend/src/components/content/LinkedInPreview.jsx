function LinkedInPreview({ profile, content }) {
  const name = profile.name || 'Your name'
  const headline = profile.headline || 'Your professional headline'
  const body = content?.content || 'Your post preview will appear here as you write.'
  const words = body.trim() ? body.trim().split(/\s+/).length : 0

  return (
    <section className="panel linkedin-preview-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Audience view</p><h2>LinkedIn preview</h2></div><span className="preview-label">Preview only</span></div><article className="linkedin-post"><div className="linkedin-author">{profile.photo ? <img src={profile.photo} alt="" /> : <span>{getInitials(name)}</span>}<div><strong>{name}</strong><p>{headline}</p><small>Just now · <span>Public</span></small></div></div><p className="linkedin-body">{body}</p><div className="linkedin-stats"><span>♡ Like</span><span>↗ Comment</span><span>↗ Repost</span><span>↗ Send</span></div></article><div className="preview-metrics"><span><strong>{body.length}</strong> characters</span><span><strong>{words}</strong> words</span></div></section>
  )
}

function getInitials(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

export default LinkedInPreview