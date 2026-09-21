function ProfileSection({ eyebrow, title, children, action }) {
  return (
    <section className="profile-section panel">
      <div className="profile-section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export default ProfileSection
