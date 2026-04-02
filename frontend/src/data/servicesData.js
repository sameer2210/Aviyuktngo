import {
  Wheat,
  Pill,
  HeartPulse,
  BriefcaseBusiness,
  GraduationCap,
  Wrench,
  Building2,
  ShieldCheck,
  House,
} from 'lucide-react';

export const servicesData = [
  {
    slug: 'agriculture',
    title: 'Agriculture',
    icon: Wheat,
    shortDescription:
      'Guidance and support for farmers, crop planning, and sustainable cultivation practices.',
    detailDescription:
      'Our agriculture service helps rural families improve crop quality, reduce input costs, and build stronger livelihoods through practical field guidance.',
    howItWorks:
      'We connect farmers with domain experts, run awareness camps, and provide season-wise support for seeds, soil health, water use, and market readiness.',
    benefits:
      'Stronger harvest outcomes, better income stability, and long-term resilience for farming communities.',
    offerings: [
      'Crop advisory and seasonal farming plans',
      'Soil and water conservation awareness',
      'Government scheme guidance for farmers',
      'Community workshops and field training',
    ],
    impact:
      'Small farming groups have improved crop planning and reduced avoidable losses with timely intervention.',
  },
  {
    slug: 'medicine',
    title: 'Medicine',
    icon: Pill,
    shortDescription:
      'Essential medicine support for low-income families and urgent patient assistance.',
    detailDescription:
      'Our medicine service assists vulnerable households with medicine access, especially in emergency and chronic care situations.',
    howItWorks:
      'We identify verified cases, coordinate with local pharmacies and hospitals, and support medicine procurement through donor-backed assistance.',
    benefits:
      'Faster treatment continuity, reduced financial burden, and improved recovery chances for patients.',
    offerings: [
      'Medicine support for verified medical cases',
      'Referral support for partner pharmacies',
      'Awareness around safe medicine usage',
      'Follow-up support for critical patients',
    ],
    impact:
      'Families in urgent need have received critical medicines without treatment delays.',
  },
  {
    slug: 'health',
    title: 'Health',
    icon: HeartPulse,
    shortDescription:
      'Community health drives, preventive awareness, and wellness outreach programs.',
    detailDescription:
      'Our health service focuses on preventive care and early intervention through local camps and awareness activities.',
    howItWorks:
      'We organize health checkup camps, awareness sessions, and connect individuals to appropriate care facilities when required.',
    benefits:
      'Improved health awareness, earlier diagnosis, and healthier communities through continuous outreach.',
    offerings: [
      'General health checkup camps',
      'Maternal and child health awareness',
      'Nutrition and hygiene education sessions',
      'Referral support for advanced care',
    ],
    impact:
      'Local communities report better health literacy and increased participation in regular checkups.',
  },
  {
    slug: 'placement',
    title: 'Placement',
    icon: BriefcaseBusiness,
    shortDescription:
      'Employment readiness support including counseling, profile building, and job linkage.',
    detailDescription:
      'Our placement service helps youth and job seekers transition into employment through practical career support.',
    howItWorks:
      'We conduct career counseling sessions, help with resumes, interview preparation, and connect candidates to hiring opportunities.',
    benefits:
      'Higher confidence, improved employability skills, and better access to stable job opportunities.',
    offerings: [
      'Career counseling and goal mapping',
      'Resume and interview preparation',
      'Job opportunity referrals',
      'Skill-gap guidance and upskilling roadmap',
    ],
    impact:
      'Many first-time job seekers have found direction and improved interview readiness.',
  },
  {
    slug: 'education',
    title: 'Education',
    icon: GraduationCap,
    shortDescription:
      'Learning support for children and youth through mentoring, material support, and awareness.',
    detailDescription:
      'Our education service supports students with resources, motivation, and continuity in learning.',
    howItWorks:
      'We provide mentorship sessions, learning material support, and parent-student awareness meetings to reduce dropout risk.',
    benefits:
      'Better learning outcomes, increased school continuity, and stronger confidence among students.',
    offerings: [
      'Student mentorship and learning support',
      'Basic study material and guidance',
      'Awareness sessions for families',
      'Support for education continuity',
    ],
    impact:
      'Students receiving mentorship show stronger engagement and better learning discipline.',
  },
  {
    slug: 'rental-work',
    title: 'Rental Work',
    icon: Wrench,
    shortDescription:
      'Support and guidance for rental-related documentation and coordination work.',
    detailDescription:
      'Our rental work service helps families navigate rent-related processes with clear guidance and documentation support.',
    howItWorks:
      'We help with basic process clarity, paperwork checks, and referrals to trusted local service contacts where needed.',
    benefits:
      'Reduced confusion, smoother documentation, and faster resolution for rental formalities.',
    offerings: [
      'Rental process and documentation guidance',
      'Basic agreement awareness support',
      'Tenant-owner coordination facilitation',
      'Support referrals for local rental services',
    ],
    impact:
      'Families have completed rental formalities faster with fewer documentation errors.',
  },
  {
    slug: 'property',
    title: 'Property (Purchase, Loan, Registry, Mutation)',
    icon: Building2,
    shortDescription:
      'Assistance for property workflows including purchase support and documentation guidance.',
    detailDescription:
      'Our property service provides practical support for major property-related steps, especially for first-time applicants.',
    howItWorks:
      'We offer process guidance for purchase, loan file readiness, registry preparation, and mutation flow understanding.',
    benefits:
      'Better decision clarity, lower process delays, and improved confidence during documentation-heavy tasks.',
    offerings: [
      'Property purchase process guidance',
      'Loan documentation readiness support',
      'Registry and mutation workflow support',
      'Checklist-based document assistance',
    ],
    impact:
      'Applicants have avoided common process mistakes and improved paperwork quality.',
  },
  {
    slug: 'insurance-legal-court-case-work',
    title: 'Insurance (Legal & Court Case Work)',
    icon: ShieldCheck,
    shortDescription:
      'Support for insurance processes with legal and court-case related guidance touchpoints.',
    detailDescription:
      'Our insurance support service helps beneficiaries understand claim processes and navigate legal complexity with the right direction.',
    howItWorks:
      'We assist with claim documentation flow, process awareness, and connect individuals to relevant legal support channels when needed.',
    benefits:
      'Better claim preparedness, fewer missed steps, and improved confidence during critical legal workflows.',
    offerings: [
      'Insurance claim process guidance',
      'Documentation checklists and support',
      'Legal workflow awareness assistance',
      'Referral support for case-specific help',
    ],
    impact:
      'Beneficiaries have handled insurance and legal process steps with greater clarity and fewer errors.',
  },
  {
    slug: 'household-services',
    title: 'Household Services',
    icon: House,
    shortDescription:
      'Practical support for household needs through trusted community-driven service coordination.',
    detailDescription:
      'Our household services connect families with reliable assistance for daily and essential home-related needs.',
    howItWorks:
      'We understand the household requirement, guide service selection, and support with trusted local coordination where possible.',
    benefits:
      'Time savings, reliable service access, and reduced stress for families managing urgent household tasks.',
    offerings: [
      'Basic household support coordination',
      'Service requirement assessment guidance',
      'Trusted local referral pathways',
      'Follow-up support for service completion',
    ],
    impact:
      'Many families have resolved urgent household needs quickly through coordinated local support.',
  },
];

