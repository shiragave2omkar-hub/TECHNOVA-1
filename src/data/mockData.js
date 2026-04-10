export const exploreCategories = [
  "Education",
  "Health",
  "Employment",
  "Travel",
  "Financial Support",
  "Assistive Devices",
]

export const schemes = [
  {
    id: 1,
    relatedEligibleId: 101,
    category: "Education",
    name: "Higher Education Scholarship for Students with Disabilities",
    description: "Covers tuition support, assistive learning costs, and annual maintenance allowance for college students.",
    eligibilitySummary: "For students with 40%+ disability and family income within EWS or low-income category.",
    recommended: true,
  },
  {
    id: 2,
    relatedEligibleId: 102,
    category: "Health",
    name: "Accessible Health Support Card",
    description: "Provides subsidized diagnostics, rehabilitation sessions, and hospital referral support at empaneled centres.",
    eligibilitySummary: "Available for benchmark disability certificate holders requiring recurring treatment support.",
  },
  {
    id: 3,
    relatedEligibleId: 103,
    category: "Employment",
    name: "Inclusive Skill and Placement Mission",
    description: "Offers job-readiness training, placement assistance, and stipend support during certification.",
    eligibilitySummary: "Open to adults seeking first-time employment or reskilling after disability-related interruption.",
    recommended: true,
  },
  {
    id: 4,
    category: "Travel",
    name: "Interstate Travel Concession Pass",
    description: "Enables discounted train and bus travel for medical visits, education, and government service access.",
    eligibilitySummary: "Requires valid disability ID and proof of travel need for concession issuance.",
  },
  {
    id: 5,
    category: "Financial Support",
    name: "Monthly Disability Assistance Grant",
    description: "Direct monthly support to help manage household expenses, medicine, and caregiver costs.",
    eligibilitySummary: "Designed for low-income applicants with certified disability and verified bank details.",
    recommended: true,
  },
  {
    id: 6,
    relatedEligibleId: 104,
    category: "Assistive Devices",
    name: "Mobility and Assistive Device Support",
    description: "Supports wheelchairs, hearing aids, smart canes, and device fitting through approved centres.",
    eligibilitySummary: "For applicants who need prescribed assistive devices and meet income limits.",
  },
]

export const eligibleFilters = [
  "All",
  "Ready to Apply",
  "Missing Documents",
  "Education",
  "Health",
  "Employment",
]

export const eligibleSchemes = [
  {
    id: 101,
    name: "Higher Education Scholarship for Students with Disabilities",
    category: "Education",
    incomePriority: "EWS",
    whyEligibleItems: [
      { label: "Meets disability criteria", met: true },
      { label: "Income eligible", met: true },
      { label: "Missing income certificate", met: false },
    ],
    status: "Ready to Apply",
    insight: "Your core eligibility is confirmed. Upload the income certificate once to complete this application path.",
  },
  {
    id: 102,
    name: "Accessible Health Support Card",
    category: "Health",
    incomePriority: "Low Income",
    whyEligibleItems: [
      { label: "Meets disability criteria", met: true },
      { label: "Income eligible", met: true },
      { label: "Missing income certificate", met: false },
    ],
    status: "Missing Documents",
    insight: "Your profile fits the programme, but supporting proof is still needed before submission.",
  },
  {
    id: 103,
    name: "Inclusive Skill and Placement Mission",
    category: "Employment",
    whyEligibleItems: [
      { label: "Meets disability criteria", met: true },
      { label: "Income eligible", met: false },
      { label: "Missing income certificate", met: false },
    ],
    status: "Partially Eligible",
    insight: "You fit the programme intent, but your documentation does not yet unlock the full benefit set.",
  },
  {
    id: 104,
    name: "Post-Secondary Learning Device Grant",
    category: "Education",
    incomePriority: "EWS",
    whyEligibleItems: [
      { label: "Meets disability criteria", met: true },
      { label: "Income eligible", met: true },
      { label: "Missing income certificate", met: false },
    ],
    status: "Ready to Apply",
    insight: "This is one of the fastest applications to complete because most of your core details already align.",
  },
]

export const mockUser = {
  udid: "UDID-MH-2024-0198",
  name: "Priya Sharma",
  state: "Maharashtra",
  disabilityType: "Locomotor Disability",
  disabilityPercentage: "62%",
  incomeCategory: "EWS",
  incomeStatus: "not_uploaded",
  incomeAmount: null,
  income_verified: false,
  income_amount: 0,
}

export const udidProfiles = [
  mockUser,
  {
    udid: "UDID-DL-2023-1142",
    name: "Aman Verma",
    state: "Delhi",
    disabilityType: "Visual Impairment",
    disabilityPercentage: "48%",
    incomeCategory: "Low Income",
    incomeStatus: "flagged",
    incomeAmount: 320000,
    income_verified: false,
    income_amount: 320000,
  },
  {
    udid: "UDID-KA-2025-0087",
    name: "Farah Khan",
    state: "Karnataka",
    disabilityType: "Hearing Impairment",
    disabilityPercentage: "55%",
    incomeCategory: "EWS",
    incomeStatus: "verified",
    incomeAmount: 180000,
    income_verified: true,
    income_amount: 180000,
  },
]

export const recentActivity = [
  { id: 1, type: "eligibility", title: "Checked eligibility", detail: "Reviewed matches for education and health schemes", time: "Today" },
  { id: 2, type: "application", title: "Applied for scheme", detail: "Started scholarship application draft", time: "Yesterday" },
  { id: 3, type: "document", title: "Uploaded document", detail: "Added updated disability certificate", time: "2 days ago" },
]
