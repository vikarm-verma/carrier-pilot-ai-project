const navigationItems = [
  { label: 'Dashboard', icon: 'DB', route: 'dashboard' },
  { label: 'My Profile', icon: 'MP', route: 'profile' },
  { label: 'Content Planner', icon: 'CP', route: 'content' },
  { label: 'Opportunities', icon: 'OP', route: 'opportunities' },
  { label: 'Outreach', icon: 'OR', route: 'outreach' },
  { label: 'Applications', icon: 'AP', route: 'applications' },
]

function Sidebar({ currentRoute }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">CP</span>
        <span>CareerPilot <strong>AI</strong></span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>
        {navigationItems.map((item) => (
          <a
            className={`nav-item${item.route === currentRoute ? ' nav-item-active' : ''}`}
            href={`#${item.route}`}
            key={item.label}
            aria-current={item.route === currentRoute ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-orb" aria-hidden="true">AI</div>
        <div>
          <strong>Career copilot</strong>
          <span>Ready when you are</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
