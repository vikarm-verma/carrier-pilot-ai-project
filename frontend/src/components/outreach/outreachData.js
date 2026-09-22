export const contactTypes = ['Recruiter', 'Hiring Manager', 'HR', 'Employee', 'Referral', 'Industry', 'Other']
export const messageTypes = ['Connection Request', 'Introduction', 'Job Inquiry', 'Referral Request', 'Follow-up', 'Thank You', 'Networking']
export const outreachStatuses = ['Draft', 'Ready', 'Sent', 'Replied', 'Follow-up Due', 'Closed']

export const defaultContacts = [
  { id: 'contact-1', name: 'Jordan Kim', jobTitle: 'Design Lead', company: 'Northstar Labs', contactType: 'Hiring Manager', linkedinUrl: 'https://linkedin.com/in/jordan-kim-demo', email: '', notes: 'Met during a product design community session.' },
  { id: 'contact-2', name: 'Riya Shah', jobTitle: 'Product Manager', company: 'SignalWorks', contactType: 'Industry', linkedinUrl: '', email: 'riya@example.com', notes: 'Works on applied AI products.' },
  { id: 'contact-3', name: 'Dylan Lee', jobTitle: 'Talent Partner', company: 'Arc Studio', contactType: 'Recruiter', linkedinUrl: '', email: '', notes: 'Shared an early-career engineering opportunity.' },
]

export const defaultOutreach = [
  { id: 'outreach-1', contactId: 'contact-1', contact: defaultContacts[0], opportunityId: 'opp-java-01', opportunity: null, messageType: 'Introduction', subject: '', message: 'Hi Jordan, I enjoyed learning about the product work at Northstar Labs and would love to stay connected.', status: 'Sent', followUpDate: '2026-09-24', createdAt: '2026-09-10T09:00:00.000Z', updatedAt: '2026-09-10T09:00:00.000Z' },
  { id: 'outreach-2', contactId: 'contact-2', contact: defaultContacts[1], opportunityId: '', opportunity: null, messageType: 'Networking', subject: '', message: 'Hi Riya, your perspective on applied AI products stood out to me. I would enjoy hearing how you approach product learning.', status: 'Replied', followUpDate: '', createdAt: '2026-09-12T09:00:00.000Z', updatedAt: '2026-09-17T09:00:00.000Z' },
  { id: 'outreach-3', contactId: 'contact-3', contact: defaultContacts[2], opportunityId: 'opp-software-06', opportunity: null, messageType: 'Follow-up', subject: 'Following up on our conversation', message: 'Hi Dylan, I wanted to follow up on our conversation and share that I remain interested in the role.', status: 'Follow-up Due', followUpDate: '2026-09-20', createdAt: '2026-09-13T09:00:00.000Z', updatedAt: '2026-09-19T09:00:00.000Z' },
]

export const builtInTemplates = [
  { id: 'template-1', name: 'Recruiter Introduction', messageType: 'Introduction', subject: '', message: 'Hi [Name], I came across your work at [Company] and wanted to introduce myself. I am [Your role] exploring opportunities in [Target area]. I would be glad to connect and learn more about your team.' },
  { id: 'template-2', name: 'Hiring Manager Introduction', messageType: 'Introduction', subject: '', message: 'Hi [Name], I have been following the work your team is doing at [Company]. My background in [Skills] connects closely with the problems you are solving, and I would appreciate the chance to connect.' },
  { id: 'template-3', name: 'Referral Request', messageType: 'Referral Request', subject: 'Quick question about [Role]', message: 'Hi [Name], I am interested in the [Role] opportunity at [Company]. Since you know the team, would you be open to sharing any perspective on the role or referral process?' },
  { id: 'template-4', name: 'Follow-up After Application', messageType: 'Follow-up', subject: 'Following up on [Role]', message: 'Hi [Name], I recently applied for [Role] and wanted to follow up with a short note. The opportunity feels aligned with my experience in [Skills]. Thank you for your time.' },
  { id: 'template-5', name: 'Thank You Message', messageType: 'Thank You', subject: '', message: 'Hi [Name], thank you for taking the time to speak with me. I appreciated your perspective on [Topic] and will carry it into my next steps.' },
  { id: 'template-6', name: 'Networking Introduction', messageType: 'Networking', subject: '', message: 'Hi [Name], I am building my career in [Target area] and noticed your experience in the field. I would enjoy connecting and learning from your journey.' },
]
