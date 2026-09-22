import { useState } from 'react'
import OpportunityCard from '../components/opportunities/OpportunityCard'
import OpportunityDetails from '../components/opportunities/OpportunityDetails'
import OpportunityFilters from '../components/opportunities/OpportunityFilters'
import OpportunityProfile from '../components/opportunities/OpportunityProfile'
import OpportunitySearch from '../components/opportunities/OpportunitySearch'
import OpportunitySort from '../components/opportunities/OpportunitySort'
import SavedOpportunities from '../components/opportunities/SavedOpportunities'
import { createOpportunityDraft } from '../components/applications/applicationData'
import { allSkills, demoOpportunities, salaryRanges } from '../components/opportunities/opportunityData'

const SAVED_KEY = 'careerpilot_opportunities'
const APPLICATION_DRAFT_KEY = 'careerpilot_application_draft'
const defaultProfile = { name: 'Alex Morgan', headline: '', role: '', about: '', skills: [], experience: [], preferences: { roles: '', locations: '', workMode: '', industries: '' } }
const emptySearch = { keyword: '', location: '', company: '' }
const emptyFilters = { employmentType: 'any', workMode: 'any', experienceLevel: 'any', salaryRange: 'any', skill: 'any', company: 'any' }

function readStorage(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function getProfile() {
  const profile = readStorage('careerpilot_profile', defaultProfile)
  return { ...defaultProfile, ...profile, preferences: { ...defaultProfile.preferences, ...profile.preferences } }
}

function Opportunities() {
  const [profile] = useState(getProfile)
  const [savedItems, setSavedItems] = useState(() => readStorage(SAVED_KEY, []))
  const [search, setSearch] = useState(emptySearch)
  const [activeSearch, setActiveSearch] = useState(emptySearch)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState('relevance')
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showSaved, setShowSaved] = useState(false)

  const persistSaved = (nextItems) => { setSavedItems(nextItems); window.localStorage.setItem(SAVED_KEY, JSON.stringify(nextItems)) }
  const toggleSaved = (opportunity) => {
    const exists = savedItems.some((saved) => saved.opportunity.id === opportunity.id)
    const nextItems = exists ? savedItems.filter((saved) => saved.opportunity.id !== opportunity.id) : [{ opportunity, savedAt: new Date().toISOString(), status: 'Saved' }, ...savedItems]
    persistSaved(nextItems)
  }
  const resetSearch = () => { setSearch(emptySearch); setActiveSearch(emptySearch); setFilters(emptyFilters); setSort('relevance') }
  const profileSkills = profile.skills?.map((skill) => skill.name || skill).filter(Boolean) || []
  const profileText = `${profile.preferences.roles} ${profile.headline} ${profile.role} ${profileSkills.join(' ')}`.toLowerCase()
  const recommendedTerms = profile.preferences.roles || profile.role || profile.headline
  const filteredOpportunities = demoOpportunities.filter((opportunity) => {
    const searchable = `${opportunity.title} ${opportunity.company} ${opportunity.location} ${opportunity.skills.join(' ')} ${opportunity.description}`.toLowerCase()
    const matchesSearch = (!activeSearch.keyword || searchable.includes(activeSearch.keyword.toLowerCase())) && (!activeSearch.location || opportunity.location.toLowerCase().includes(activeSearch.location.toLowerCase())) && (!activeSearch.company || opportunity.company.toLowerCase().includes(activeSearch.company.toLowerCase()))
    const matchesFilters = (filters.employmentType === 'any' || opportunity.employmentType === filters.employmentType) && (filters.workMode === 'any' || opportunity.workMode === filters.workMode) && (filters.experienceLevel === 'any' || opportunity.experienceLevel === filters.experienceLevel) && (filters.skill === 'any' || opportunity.skills.includes(filters.skill)) && (filters.company === 'any' || opportunity.company === filters.company) && matchesSalary(opportunity, filters.salaryRange)
    return matchesSearch && matchesFilters
  }).sort((left, right) => sortOpportunities(left, right, sort, profileText))
  const companies = [...new Set(demoOpportunities.map((opportunity) => opportunity.company))].sort()
  const isSaved = (opportunity) => savedItems.some((saved) => saved.opportunity.id === opportunity.id)
  const trackApplication = (opportunity) => {
    window.localStorage.setItem(APPLICATION_DRAFT_KEY, JSON.stringify(createOpportunityDraft(opportunity)))
    window.location.hash = 'applications'
  }

  if (selectedOpportunity) return <main className="dashboard-content opportunity-page"><OpportunityDetails opportunity={selectedOpportunity} isSaved={isSaved(selectedOpportunity)} onSave={toggleSaved} onTrackApplication={trackApplication} onBack={() => setSelectedOpportunity(null)} /></main>

  return (
    <main className="dashboard-content opportunity-page">
      <div className="opportunity-page-heading"><div><p className="eyebrow accent-eyebrow">Opportunity radar</p><h2>Find your next move</h2><p>Search a focused demo catalog and keep the paths worth exploring close at hand.</p></div><button className={showSaved ? 'secondary-button save-opportunity-active' : 'secondary-button'} type="button" onClick={() => setShowSaved((current) => !current)}>{showSaved ? 'Browse all opportunities' : `Saved opportunities (${savedItems.length})`}</button></div>
      <OpportunityProfile profile={profile} />
      {showSaved ? <SavedOpportunities savedItems={savedItems} onRemove={(id) => persistSaved(savedItems.filter((saved) => saved.opportunity.id !== id))} onDetails={setSelectedOpportunity} /> : <><section className="panel opportunity-search-panel"><div className="section-heading"><div><p className="eyebrow accent-eyebrow">Search the signal</p><h2>Opportunity search</h2></div><span className="demo-label">Local demo data</span></div><OpportunitySearch values={search} onChange={setSearch} onSearch={() => setActiveSearch(search)} onReset={resetSearch} /><div className="recommended-search">{recommendedTerms ? <><span>Recommended search</span><button type="button" onClick={() => { const keyword = profile.preferences.roles || profile.role || profile.headline; setSearch({ ...search, keyword }); setActiveSearch({ ...search, keyword }) }}>{recommendedTerms}</button></> : <span>Complete target roles or a headline in My Profile to get search suggestions.</span>}</div></section><section className="panel opportunity-results-panel"><div className="opportunity-results-toolbar"><div><p className="eyebrow accent-eyebrow">Discovery queue</p><h2>{filteredOpportunities.length} opportunities</h2></div><OpportunitySort value={sort} onChange={setSort} /></div><OpportunityFilters filters={filters} skills={allSkills} companies={companies} onChange={setFilters} />{filteredOpportunities.length ? <div className="research-opportunity-list">{filteredOpportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} isSaved={isSaved(opportunity)} onSave={toggleSaved} onDetails={setSelectedOpportunity} />)}</div> : <div className="opportunity-empty"><strong>No opportunities match this search.</strong><p>Try clearing a filter or widening the location and keyword.</p><button className="quiet-button" type="button" onClick={resetSearch}>Reset search</button></div>}</section></>}
    </main>
  )
}

function matchesSalary(opportunity, rangeValue) {
  const range = salaryRanges.find((item) => item.value === rangeValue)
  return !range || range.value === 'any' || ((!range.min || opportunity.salaryMax >= range.min) && (!range.max || opportunity.salaryMin < range.max))
}

function sortOpportunities(left, right, sort, profileText) {
  if (sort === 'recent') return new Date(right.postedDate) - new Date(left.postedDate)
  if (sort === 'salary-high') return right.salaryMax - left.salaryMax
  if (sort === 'salary-low') return left.salaryMin - right.salaryMin
  const leftMatches = left.skills.filter((skill) => profileText.includes(skill.toLowerCase())).length + (profileText.includes(left.title.toLowerCase()) ? 2 : 0)
  const rightMatches = right.skills.filter((skill) => profileText.includes(skill.toLowerCase())).length + (profileText.includes(right.title.toLowerCase()) ? 2 : 0)
  return rightMatches - leftMatches
}

export default Opportunities
