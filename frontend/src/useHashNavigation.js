import { useEffect, useState } from 'react'

export const routes = {
  dashboard: { title: 'Dashboard', description: 'Your career activity at a glance' },
  profile: { title: 'My Profile', description: 'Manage your professional career profile' },
  content: { title: 'Content Planner', description: 'Plan and organize your LinkedIn content' },
  opportunities: { title: 'Opportunities', description: 'Explore and organize career opportunities' },
  outreach: { title: 'Outreach', description: 'Manage professional relationships and follow-ups' },
  applications: { title: 'Applications', description: 'Track your job applications' },
}

function getCurrentRoute() {
  const route = window.location.hash.replace('#', '')
  return routes[route] ? route : 'dashboard'
}

export function useHashNavigation() {
  const [currentRoute, setCurrentRoute] = useState(getCurrentRoute)

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(getCurrentRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (route) => {
    if (routes[route]) window.location.hash = route
  }

  return { currentRoute, navigate }
}
