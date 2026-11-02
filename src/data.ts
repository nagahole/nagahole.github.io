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
  version: 'v2026.2',
  email: 'rickwang121@gmail.com',
  github: 'nagahole',
  linkedin: 'rick-wang-nz',
  resumeHref: '/resume.pdf',
  tagline: 'SOFTWARE ENGINEER · SAN FRANCISCO',
  status: 'building a C++20 ITCH feed handler',
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'ITCH Feed Handler',
    role: 'Market data · order books',
    desc: 'Building a parser and limit order book for Nasdaq TotalView-ITCH 5.0 market data, designed to process a full trading day from a memory-mapped file. Tested under AddressSanitizer and UBSan, with profiling and a lock-free pipeline planned.',
    stack: ['C++20', 'CMake', 'Catch2'],
    year: '2026',
    href: 'https://github.com/nagahole/cpp-itch',
    type: 'Systems · In progress',
  },
  {
    id: '02',
    name: 'Byte Blasters',
    role: 'Roguelike shooter',
    desc: 'Built solo in 10 weeks: 16k lines of C# across 21 modules, with modular weapons, node-graph enemy AI, and a GPU compute shader for fog of war. Playable on itch.io.',
    stack: ['C#', 'Unity', 'HLSL'],
    year: '2023',
    href: 'https://github.com/nagahole/byte-blasters',
    type: 'Game · Solo',
  },
  {
    id: '03',
    name: 'Generic Minimaxer',
    role: 'Game-tree search engine',
    desc: 'Game-agnostic minimax engine with alpha-beta pruning, iterative deepening, and a hard time limit using cancellable worker threads. Implement a game’s rules and get a bot.',
    stack: ['Python', 'Algorithms'],
    year: '2025',
    href: 'https://github.com/nagahole/generic_minimaxer',
    type: 'Algorithms · Solo',
  },
  {
    id: '04',
    name: 'PocketWise',
    role: 'Mobile finance tracker',
    desc: 'Budgeting app published on the App Store from Feb 2023 to Feb 2024, with Google & Apple sign-in, real-time sync, and spending analytics.',
    stack: ['React Native', 'Firebase', 'JavaScript'],
    year: '2023',
    href: 'https://github.com/nagahole/pocketwise',
    type: 'Mobile · Shipped',
  },
  {
    id: '05',
    name: 'CS Capstone (Advanced)',
    role: 'ML image synthesis',
    desc: 'Team project synthesising CT scans from MRI scans, run through the full development lifecycle with industry mentors.',
    stack: ['Python', 'Machine Learning', 'GCP'],
    year: '2025',
    href: 'https://github.com/COMP3988/COMP3988_F12_01',
    type: 'Capstone · Team',
  },
  {
    id: '06',
    name: 'Scope',
    role: 'Aim trainer',
    desc: 'FPS aim trainer with 17 scenarios and sensitivity presets for 20 games, released free on itch.io.',
    stack: ['C#', 'Unity'],
    year: '2020',
    href: 'https://github.com/nagahole/scope',
    type: 'Game · Solo',
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: '01',
    org: 'Strala',
    role: 'Software Engineer',
    loc: 'San Francisco',
    period: 'Oct 2026 — Present',
    desc: 'Building full-stack features end to end at a Series A AI insurance startup, from scoping with operations to production. Python, React/TypeScript, GCP, Terraform, and Docker.',
  },
  {
    id: '02',
    org: 'Jane Street',
    role: 'Software Engineer Intern',
    loc: 'Hong Kong',
    period: 'Dec 2025 — Feb 2026',
    desc: 'Built OCaml RPC servers to split large backtesting jobs into shards and distribute them across workers, part of a team effort that cut run times from days to hours. Presented the sharding design and implementation at internal tech talks.',
  },
  {
    id: '03',
    org: 'University of Sydney',
    role: 'Tutor — COMP2017 / COMP3221',
    loc: 'Sydney',
    period: 'Feb 2025 — Jul 2025',
    desc: 'Ran weekly tutorials for Systems Programming in C and Distributed Systems, covering memory management, concurrency, networking, and consensus protocols.',
  },
  {
    id: '04',
    org: 'SoleAgents',
    role: 'Freelance Web Developer',
    loc: 'Remote',
    period: 'Jan 2025 — Present',
    desc: 'Built and maintain a client’s real estate website, with property search, mailing lists, and enquiry forms.',
  },
  {
    id: '05',
    org: 'University of Sydney',
    role: 'Software Developer',
    loc: 'Sydney',
    period: 'Mar 2024 — Dec 2024',
    desc: 'Built chemistry lab simulations in Unity (C#) with biochemistry staff for online lab classes, modelling how pH, volume, and concentration change during liquid transfers in real-time 3D.',
  },
]

export const stackGroups: StackGroup[] = [
  {
    label: 'languages',
    items: ['OCaml', 'C', 'C++', 'Python', 'C#', 'TypeScript', 'Java'],
  },
  {
    label: 'systems',
    items: [
      'Concurrency',
      'Parallelism',
      'Distributed Systems',
      'Networking',
      'Memory Management',
      'RPC',
    ],
  },
  {
    label: 'tools',
    items: ['Git', 'Linux', 'Docker', 'GCP', 'Terraform', 'React', 'Unity'],
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
    value: 'San Francisco · Pacific Time',
  },
]

export const systemInfo: { key: string; value: string }[] = [
  { key: 'now', value: 'SWE @ Strala' },
  { key: 'prev', value: 'SWE Intern @ Jane Street' },
  { key: 'focus', value: 'systems · performance · market data' },
  { key: 'edu', value: 'USyd · CS / Cybersecurity Minor' },
  { key: 'scores', value: 'WAM 86.6 (HD) · ATAR 99.95' },
  { key: 'awards', value: "GS Caird · High Honour · Dean's List" },
  { key: 'cube', value: '17s average' },
]
