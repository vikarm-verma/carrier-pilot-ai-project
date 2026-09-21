import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ContentPlanner from './pages/ContentPlanner'
import Opportunities from './pages/Opportunities'
import Outreach from './pages/Outreach'
import Profile from './pages/Profile'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import { routes, useHashNavigation } from './useHashNavigation'

const pageComponents = {
  dashboard: Dashboard,
  profile: Profile,
  content: ContentPlanner,
  opportunities: Opportunities,
  outreach: Outreach,
  applications: Applications,
}

function App() {
  const { currentRoute } = useHashNavigation()
  const Page = pageComponents[currentRoute]
  const page = routes[currentRoute]

  return (
    <div className="app-shell">
      <Sidebar currentRoute={currentRoute} />
      <div className="app-main">
        <Header title={page.title} description={page.description} />
        <Page />
      </div>
    </div>
  )
}

export default App