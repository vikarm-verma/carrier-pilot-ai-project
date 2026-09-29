export const PROFILE_STORAGE_KEY = 'careerpilot_profile'
export const PROFILE_UPDATED_EVENT = 'careerpilot-profile-updated'

export const defaultProfile = {
  name: 'Alex Morgan',
  headline:
    'Aspiring product designer building thoughtful digital experiences',
  role: 'Career builder · Open to new opportunities',
  photo: '',
  about: '',
  experience: [],
  skills: [],
  preferences: {
    roles: '',
    locations: '',
    workMode: 'Remote',
    industries: '',
  },
  education: [],
  certifications: [],
  links: {
    linkedin: '',
    github: '',
    portfolio: '',
  },
}

export function getSavedProfile() {
  try {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY)

    if (!saved) {
      return defaultProfile
    }

    const parsed = JSON.parse(saved)

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return defaultProfile
    }

    return {
      ...defaultProfile,
      ...parsed,
      name: typeof parsed.name === 'string' ? parsed.name : defaultProfile.name,
      headline:
        typeof parsed.headline === 'string'
          ? parsed.headline
          : defaultProfile.headline,
      role: typeof parsed.role === 'string' ? parsed.role : defaultProfile.role,
      preferences: {
        ...defaultProfile.preferences,
        ...(parsed.preferences || {}),
      },
      links: {
        ...defaultProfile.links,
        ...(parsed.links || {}),
      },
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      education: Array.isArray(parsed.education) ? parsed.education : [],
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
        : [],
    }
  } catch {
    return defaultProfile
  }
}