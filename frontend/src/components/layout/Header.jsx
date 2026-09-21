function Header({ title, description }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{description}</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="ai-status">
          <span className="status-dot" aria-hidden="true" />
          <span>AI systems online</span>
        </div>
        <button className="icon-button" type="button" aria-label="Open notifications">
          !
        </button>
        <div className="profile-chip">
          <span className="avatar">AM</span>
          <span className="profile-copy">
            <strong>Alex Morgan</strong>
            <small>Career builder</small>
          </span>
          <span className="chevron" aria-hidden="true">+</span>
        </div>
      </div>
    </header>
  )
}

export default Header
