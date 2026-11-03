export type Link = {
  label: string
  href: string
}

export type Role = {
  title: string
  org: string
  orgHref?: string
  location: string
  period: string
  summary: string
}

export type Project = {
  name: string
  kind: string
  summary: string
  tech: string[]
  year: string
  links: Link[]
  status?: string
  // The repo's commits are a whole team's, not just mine
  team?: boolean
}

export type Stat = {
  // Numbers count up when revealed; text is shown as is
  value: number | string
  decimals?: number
  suffix?: string
  label: string
  note: string
  // Tick bar: how many ticks, and what fraction are lit
  ticks?: number
  filled?: number
  // Ticks from `from` on are hatched, and `label` explains them in the note
  hatched?: { from: number; label: string }
}

export type NowRow = {
  key: string
  value: string
}

export type SideProject = {
  summary: string
  detail: string
  href: string
  // Segmented progress: `lit` of `of` segments
  progress: { lit: number; of: number; label: string }
}

export const profile = {
  name: 'Rick Wang',
  handle: 'rick',
  email: 'rickwang121@gmail.com',
  github: 'https://github.com/nagahole',
  linkedin: 'https://linkedin.com/in/rick-wang-nz',
  resume: '/resume.pdf',
}

export const hero = {
  eyebrow: 'Software engineer · San Francisco',
  lede: 'Currently at Strala, previously at Jane Street.',
  sub: 'Exploring C++ and performance engineering on the side.',
}

export const now: NowRow[] = [
  { key: 'Work', value: 'Software engineer, Strala' },
  { key: 'Before', value: 'Jane Street, Hong Kong' },
  { key: 'Studied', value: 'Computer science, University of Sydney' },
]

export const sideProject: SideProject = {
  summary: 'C++ market-data feed handler',
  detail: 'A parser and limit order book for Nasdaq ITCH 5.0 data, written to learn modern C++.',
  href: 'https://github.com/nagahole/cpp-itch',
  progress: { lit: 2, of: 5, label: 'Stage 2 of 5' },
}

export const stats: Stat[] = [
  { value: 99.95, decimals: 2, label: 'ATAR', note: 'University admission rank', ticks: 40, filled: 0.9995 },
  { value: 86.6, decimals: 1, label: 'WAM', note: 'Weighted average mark', ticks: 40, filled: 0.866 },
  {
    value: 2,
    suffix: '×',
    label: 'Dean’s List',
    note: 'Y1 & Y2',
    ticks: 3,
    filled: 1,
    hatched: { from: 2, label: 'High Honour Roll Y3' },
  },
  { value: '1 of 2', label: 'GS Caird Scholarship', note: 'Second-year computer science' },
]

export const experience: Role[] = [
  {
    title: 'Software Engineer',
    org: 'Strala',
    location: 'San Francisco',
    period: 'Oct 2026 — now',
    summary:
      'Full-stack features end to end, from scoping with operations to production. Python, React and TypeScript on GCP, with Terraform and Docker.',
  },
  {
    title: 'Software Engineer Intern',
    org: 'Jane Street',
    location: 'Hong Kong',
    period: 'Dec 2025 — Feb 2026',
    summary:
      'Built OCaml RPC servers to split large jobs into shards and distribute them across workers. Presented the design at internal tech talks.',
  },
  {
    title: 'Tutor',
    org: 'University of Sydney',
    location: 'Sydney',
    period: 'Feb — Jul 2025',
    summary:
      'Ran weekly tutorials for Systems Programming in C and Distributed Systems, covering memory management, concurrency, networking and consensus.',
  },
  {
    title: 'Freelance Web Developer',
    org: 'SoleAgents',
    orgHref: 'https://soleagents.co.nz/',
    location: 'Remote',
    period: 'Jan 2025 — now',
    summary:
      'Built and maintain a real estate website with property search, mailing lists and enquiry forms.',
  },
  {
    title: 'Software Developer',
    org: 'University of Sydney',
    location: 'Sydney',
    period: 'Mar — Dec 2024',
    summary:
      'Built chemistry lab simulations in Unity with biochemistry staff for online classes, modelling how pH, volume and concentration change as liquids are transferred.',
  },
]

export const projects: Project[] = [
  {
    name: 'Byte Blasters',
    kind: 'Game',
    summary:
      'A roguelike shooter I built solo in ten weeks: 16k lines of C# with modular weapons, node-graph enemy AI and a GPU fog of war. Shown at SXSW Sydney 2024.',
    tech: ['C#', 'Unity', 'HLSL'],
    year: '2023',
    links: [
      { label: 'Code', href: 'https://github.com/nagahole/byte-blasters' },
      { label: 'Play', href: 'https://nagahole.itch.io/byte-blasters-alpha-testing' },
    ],
  },
  {
    name: 'MRI → CT Synthesis',
    kind: 'Machine learning',
    summary:
      'Lead developer on a six-person capstone generating synthetic CT from MRI for radiotherapy planning, adapting a 3D transformer-diffusion model and its training, inference and evaluation pipeline.',
    tech: ['PyTorch', 'MONAI', 'Python'],
    year: '2025',
    team: true,
    links: [{ label: 'Code', href: 'https://github.com/COMP3988/COMP3988_F12_01' }],
  },
  {
    name: 'PocketWise',
    kind: 'Mobile',
    summary:
      'A budgeting app with Google and Apple sign-in and real-time sync, live on the App Store from February 2023 to February 2024.',
    tech: ['React Native', 'Firebase'],
    year: '2023',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/pocketwise' }],
  },
  {
    name: 'Generic Minimaxer',
    kind: 'Algorithms',
    summary:
      'A game-agnostic minimax engine with alpha-beta pruning, iterative deepening and hard time limits. Describe a game’s rules and it plays.',
    tech: ['Python'],
    year: '2025',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/generic_minimaxer' }],
  },
  {
    name: 'ITCH Feed Handler',
    kind: 'Systems',
    summary:
      'A parser and limit order book for Nasdaq ITCH 5.0 market data, written to learn modern C++.',
    tech: ['C++20', 'CMake', 'Catch2'],
    year: '2026',
    status: 'In progress',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/cpp-itch' }],
  },
  {
    name: 'Scope',
    kind: 'Game',
    summary: 'A free FPS aim trainer with 17 scenarios and sensitivity presets for 20 games.',
    tech: ['C#', 'Unity'],
    year: '2020',
    links: [
      { label: 'Code', href: 'https://github.com/nagahole/scope' },
      { label: 'Download', href: 'https://nagahole.itch.io/scope' },
    ],
  },
]

export const education = {
  school: 'University of Sydney',
  degree: 'Bachelor of Computing (Computer Science), Cybersecurity minor',
  period: 'Graduated Dec 2025',
  rows: [
    { key: 'results', value: 'WAM 86.6 (High Distinction) · ATAR 99.95' },
    {
      key: 'awards',
      value:
        "GS Caird Scholarship in Computer Science, Academic Merit Prize, Dean's List, UG High Honour Roll, Chancellor's Award, Dalyell Scholar",
    },
    { key: 'clubs', value: 'Mentoring subcommittee, Sydney Competitive Programming Club' },
  ],
}

export type Stop = {
  id: string
  code: string
  place: string
  lat: number
  lon: number
  period: string
  title: string
  blurb: string
}

// In order, from where it started to now
export const journey: Stop[] = [
  {
    id: 'akl',
    code: 'AKL',
    place: 'Auckland',
    lat: -36.85,
    lon: 174.76,
    period: 'Until 2022',
    title: 'Where it started',
    blurb:
      'Where I grew up. Computer science wasn’t one of my school subjects, so I taught myself, mostly by making games, then spent the summer before university building PocketWise. Cambridge A Levels: four A*s and an A, with the top AS Mathematics result in New Zealand, sat a year early.',
  },
  {
    id: 'syd',
    code: 'SYD',
    place: 'Sydney',
    lat: -33.87,
    lon: 151.21,
    period: '2023 — 2025',
    title: 'University of Sydney',
    blurb:
      'Computer science with a cybersecurity minor, and where most of the learning happened: theory-heavy fundamentals and advanced units wherever I could take them. Also tutored systems programming and distributed systems, built lab simulations for the chemistry school, and led development on a medical-imaging capstone.',
  },
  {
    id: 'hkg',
    code: 'HKG',
    place: 'Hong Kong',
    lat: 22.32,
    lon: 114.17,
    period: 'Dec 2025 — Feb 2026',
    title: 'Jane Street',
    blurb:
      'Software engineering internship. Built OCaml RPC servers to split large jobs into shards and distribute them across workers, and presented the design at internal tech talks.',
  },
  {
    id: 'sfo',
    code: 'SFO',
    place: 'San Francisco',
    lat: 37.77,
    lon: -122.42,
    period: 'Oct 2026 — now',
    title: 'Strala',
    blurb:
      'Moved here to join Strala, a Series A startup applying AI to insurance. A small team shipping product quickly, where I build full-stack features end to end, from scoping with operations through to production. A very different pace from trading infrastructure.',
  },
]

export const sections = [
  { id: 'about', label: 'about' },
  { id: 'journey', label: 'journey' },
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'edu' },
  { id: 'contact', label: 'contact' },
]
