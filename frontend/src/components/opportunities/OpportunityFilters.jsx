import { employmentTypes, experienceLevels, salaryRanges, workModes } from './opportunityData'

function OpportunityFilters({ filters, skills, companies, onChange }) {
  const update = (field, value) => onChange({ ...filters, [field]: value })
  return (
    <div className="opportunity-filter-grid"><label>Employment type<select value={filters.employmentType} onChange={(event) => update('employmentType', event.target.value)}><option value="any">Any type</option>{employmentTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Work mode<select value={filters.workMode} onChange={(event) => update('workMode', event.target.value)}><option value="any">Any work mode</option>{workModes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Experience<select value={filters.experienceLevel} onChange={(event) => update('experienceLevel', event.target.value)}><option value="any">Any level</option>{experienceLevels.map((item) => <option key={item}>{item}</option>)}</select></label><label>Salary<select value={filters.salaryRange} onChange={(event) => update('salaryRange', event.target.value)}>{salaryRanges.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>Skill<select value={filters.skill} onChange={(event) => update('skill', event.target.value)}><option value="any">Any skill</option>{skills.map((item) => <option key={item}>{item}</option>)}</select></label><label>Company<select value={filters.company} onChange={(event) => update('company', event.target.value)}><option value="any">Any company</option>{companies.map((item) => <option key={item}>{item}</option>)}</select></label></div>
  )
}

export default OpportunityFilters