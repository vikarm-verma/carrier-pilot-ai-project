export const applicationStatuses = ['Saved', 'Applied', 'Screening', 'Interviewing', 'Offer', 'Rejected', 'Withdrawn']
export const activeStatuses = ['Saved', 'Applied', 'Screening', 'Interviewing', 'Offer']

export const emptyApplication = {
  opportunityId: '', opportunitySnapshot: null, jobTitle: '', company: '', location: '', workMode: '', employmentType: '', jobUrl: '', salary: '', source: '', applicationDate: '', status: 'Saved', contactId: '', contactName: '', contactEmail: '', contactLinkedIn: '', nextFollowUpDate: '', interviewDate: '', notes: '',
}

export function readStorage(key, fallback) {
  try { const saved = window.localStorage.getItem(key); const parsed = saved ? JSON.parse(saved) : fallback; return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed } catch { return fallback }
}

export function createId(prefix) { return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}` }

export function formatDate(value, options = { month: 'short', day: 'numeric', year: 'numeric' }) { return value ? new Intl.DateTimeFormat('en', options).format(new Date(`${value}T00:00:00`)) : 'Not set' }

export function createOpportunityDraft(opportunity) {
  return { ...emptyApplication, opportunityId: opportunity.id, opportunitySnapshot: opportunity, jobTitle: opportunity.title || '', company: opportunity.company || '', location: opportunity.location || '', workMode: opportunity.workMode || '', employmentType: opportunity.employmentType || '', jobUrl: opportunity.applicationUrl || '', salary: opportunity.currency && opportunity.salaryMin ? `${opportunity.currency} ${(opportunity.salaryMin / 100000).toFixed(0)}L - ${(opportunity.salaryMax / 100000).toFixed(0)}L` : '', source: 'Opportunity Research' }
}
