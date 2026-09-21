import OpportunityCard from '../components/dashboard/OpportunityCard'
import OutreachCard from '../components/dashboard/OutreachCard'
import QuickAction from '../components/dashboard/QuickAction'
import StatCard from '../components/dashboard/StatCard'

const stats = [
  { label: 'Content ideas', value: '24', detail: 'Ready to explore', icon: 'CI', tone: 'cyan' },
  { label: 'Opportunities', value: '18', detail: '5 new this week', icon: 'OP', tone: 'violet' },
  { label: 'Active outreach', value: '07', detail: '2 replies waiting', icon: 'OR', tone: 'magenta' },
  { label: 'Applications', value: '12', detail: '3 interviews ahead', icon: 'AP', tone: 'lime' },
]

const opportunities = [
  { role: 'Product Designer', company: 'Northstar Labs', location: 'Remote', type: 'Full-time', match: 94 },
  { role: 'UX Research Intern', company: 'Vercel', location: 'New York, NY', type: 'Internship', match: 88 },
  { role: 'Growth Design Fellow', company: 'Arc Studio', location: 'Remote', type: 'Contract', match: 81 },
]

const outreach = [
  { initials: 'JK', name: 'Jordan Kim', role: 'Design Lead at Northstar Labs', status: 'Follow up today', tone: 'cyan' },
  { initials: 'RS', name: 'Riya Shah', role: 'Product Manager at Vercel', status: 'Replied', tone: 'violet' },
  { initials: 'DL', name: 'Dylan Lee', role: 'Founder at Arc Studio', status: 'Draft ready', tone: 'magenta' },
]

function Dashboard() {
  return (
    <main className="dashboard-content">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <p className="eyebrow accent-eyebrow">Your career command center</p>
          <h2>Welcome to <span>CareerPilot AI</span></h2>
          <p className="welcome-description">
            Keep your opportunities, content, outreach, and next career move in view.
            Your AI-assisted workspace starts here.
          </p>
          <button className="primary-button" type="button" onClick={() => { window.location.hash = 'content' }}>Open your workspace <span>-&gt;</span></button>
        </div>
        <div className="welcome-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-inner" />
          <div className="orbit-core">CP<span>AI</span></div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Career summary">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      <div className="dashboard-grid">
        <section className="panel opportunities-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Stay ahead</p>
              <h2>Recent opportunities</h2>
            </div>
            <a className="text-button" href="#opportunities">View all <span>-&gt;</span></a>
          </div>
          <div className="opportunity-list">
            {opportunities.map((opportunity) => <OpportunityCard key={opportunity.role} {...opportunity} />)}
          </div>
        </section>

        <section className="panel outreach-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Build relationships</p>
              <h2>Recent outreach</h2>
            </div>
            <a className="text-button" href="#outreach">View all <span>-&gt;</span></a>
          </div>
          <div className="outreach-list">
            {outreach.map((item) => <OutreachCard key={item.name} {...item} />)}
          </div>
        </section>
      </div>

      <section className="quick-actions-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Move with intention</p>
            <h2>Quick actions</h2>
          </div>
        </div>
        <div className="quick-actions-grid">
          <QuickAction icon='+' label="Create content" description="Turn an idea into a post" tone="cyan" route="content" />
          <QuickAction icon='OP' label="Explore opportunities" description="Find your next opening" tone="violet" route="opportunities" />
          <QuickAction icon='OR' label="Start outreach" description="Build a new connection" tone="magenta" route="outreach" />
          <QuickAction icon='AP' label="View applications" description="Track your progress" tone="lime" route="applications" />
        </div>
      </section>
    </main>
  )
}

export default Dashboard
