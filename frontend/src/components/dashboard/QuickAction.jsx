function QuickAction({ icon, label, description, tone, route }) {
  return (
    <button className={`quick-action quick-action-${tone}`} type="button" onClick={() => { window.location.hash = route }}>
      <span className="quick-action-icon">{icon}</span>
      <span className="quick-action-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <span className="quick-action-arrow" aria-hidden="true">-&gt;</span>
    </button>
  )
}

export default QuickAction
