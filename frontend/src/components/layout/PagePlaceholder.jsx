function PagePlaceholder({ eyebrow, title, description, icon, children }) {
  return (
    <main className="dashboard-content">
      <section className="placeholder-panel">
        <div className="placeholder-icon" aria-hidden="true">{icon}</div>
        <p className="eyebrow accent-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="placeholder-description">{description}</p>
        <div className="placeholder-detail">{children}</div>
      </section>
    </main>
  )
}

export default PagePlaceholder
