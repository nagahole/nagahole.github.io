export type Project = {
  id: string
  name: string
  role: string
  desc: string
  stack: string[]
  year: string
  href: string
  type: string
}

export type ExperienceEntry = {
  id: string
  org: string
  role: string
  loc: string
  period: string
  desc: string
}

export type StackGroup = {
  label: string
  items: string[]
}

export type ContactItem = {
  key: string
  value: string
  href?: string
  external?: boolean
}

export const profile = {
  name: 'Rick Wang',
  handle: 'NAGAHOLE',
  version: 'v2026.1',
  email: 'rickwang121@gmail.com',
  github: 'nagahole',
  linkedin: 'rick-wang-nz',
  resumeHref: '/resume.pdf',
  tagline: 'SOFTWARE ENGINEER · AUCKLAND / SYDNEY',
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'Byte Blasters',
    role: 'Topdown shooter',
    desc: 'Arcade-style rogue-lite bullet-hell built solo over 15k+ lines of C#. Playable alpha on itch.io',
    stack: ['Unity', 'C#'],
    year: '2023',
    href: 'https://nagahole.itch.io/byte-blasters-alpha-testing',
    type: 'Game · Solo',
  },
  {
    id: '02',
    name: 'PocketWise',
    role: 'Mobile finance tracker',
    desc: 'Budget tracking with Google & Apple SSO, real-time persistence, and spending-trend analytics. Built end-to-end as a solo project.',
    stack: ['React Native', 'Firebase', 'JavaScript'],
    year: '2023',
    href: 'https://github.com/nagahole/pocketwise',
    type: 'Mobile · Solo',
  },
  {
    id: '03',
    name: 'CS Capstone (Advanced)',
    role: 'ML image synthesis',
    desc: 'Collaborative software project synthesising CT from MRI scans. Full SDLC under industry mentorship',
    stack: ['Python', 'Machine Learning', 'GCP', 'Team'],
    year: '2025',
    href: 'https://github.com/COMP3988/COMP3988_F12_01',
    type: 'Capstone · Team',
  },
  {
    id: '04',
    name: 'Scope',
    role: 'Aim trainer',
    desc: 'Solo-built indie aim trainer published on itch.io. Focused on tight feel and clean design.',
    stack: ['Unity', 'C#'],
    year: '2020',
    href: 'https://nagahole.itch.io/scope',
    type: 'Game · Solo',
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: '01',
    org: 'Jane Street',
    role: 'Software Engineer Intern',
    loc: 'Hong Kong',
    period: 'Dec 2025 — Jan 2026',
    desc: 'Backend systems in OCaml — RPC servers within latency-sensitive trading infrastructure. Contributed to a parallelisation initiative for internal computational throughput. Worked within strict code-review, testing, and reliability standards.',
  },
  {
    id: '02',
    org: 'University of Sydney',
    role: 'Tutor — COMP2017 / COMP3221',
    loc: 'Sydney',
    period: 'Feb 2025 — Jul 2025',
    desc: 'Weekly tutorials in Systems Programming (C) and Distributed Systems. Memory management, low-level addressing, threading, synchronisation, routing, consensus protocols, and blockchain security.',
  },
  {
    id: '03',
    org: 'SoleAgents',
    role: 'Web Developer',
    loc: 'Remote',
    period: 'Jan 2025 — Present',
    desc: 'Designed and deployed a WordPress real estate platform with subscription mailing lists, dynamic property filtering, and automated inquiry routing.',
  },
  {
    id: '04',
    org: 'University of Sydney',
    role: 'Software Developer',
    loc: 'Sydney',
    period: 'Mar 2024 — Dec 2024',
    desc: 'Built interactive chemistry simulations in Unity (C#) with biochemistry faculty — liquid transfer modelling pH/volume/concentration changes, with real-time 3D visual feedback.',
  },
]

export const stackGroups: StackGroup[] = [
  {
    label: 'languages',
    items: ['OCaml', 'C', 'Python', 'C#', 'JavaScript', 'Java'],
  },
  {
    label: 'systems',
    items: [
      'RPC',
      'Distributed Systems',
      'Multithreading',
      'Synchronisation',
      'Networking',
      'Parallelisation',
    ],
  },
  {
    label: 'frameworks',
    items: ['React', 'React Native', 'Firebase', 'Unity', 'WordPress'],
  },
]

export const contactItems: ContactItem[] = [
  {
    key: 'email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    key: 'github',
    value: `@${profile.github}`,
    href: `https://github.com/${profile.github}`,
    external: true,
  },
  {
    key: 'linkedin',
    value: profile.linkedin,
    href: `https://linkedin.com/in/${profile.linkedin}`,
    external: true,
  },
  {
    key: 'location',
    value: 'Sydney / Auckland · GMT+11',
  },
]

export const systemInfo: { key: string; value: string }[] = [
  { key: 'last', value: 'SWE Intern @ Jane Street' },
  { key: 'focus', value: 'systems · distributed · fintech' },
  { key: 'edu', value: 'USyd · CS Major / Cybersec Minor' },
  { key: 'awards', value: "GS Caird · High Honour · Dean's List" },
  { key: 'wam', value: '86.63 / HD avg' },
]
