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
  summary: string
  tech: string
  year: string
  links: Link[]
  status?: string
}

export const profile = {
  name: 'Rick Wang',
  role: 'Software engineer in San Francisco',
  email: 'rickwang121@gmail.com',
  github: 'https://github.com/nagahole',
  linkedin: 'https://linkedin.com/in/rick-wang-nz',
  resume: '/resume.pdf',
}

export const intro: string[] = [
  "I'm a software engineer at Strala, a Series A insurance startup, where I build full-stack features from scoping with operations through to production.",
  'Before that I interned at Jane Street and studied computer science at the University of Sydney, where I also tutored systems programming and distributed systems. On the side I like building things that have to be both fast and correct. At the moment that’s a C++ feed handler for Nasdaq market data.',
]

export const experience: Role[] = [
  {
    title: 'Software Engineer',
    org: 'Strala',
    location: 'San Francisco',
    period: 'Oct 2026 – now',
    summary:
      'Full-stack features end to end, from scoping with operations to production. Python, React and TypeScript on GCP, with Terraform and Docker.',
  },
  {
    title: 'Software Engineer Intern',
    org: 'Jane Street',
    location: 'Hong Kong',
    period: 'Dec 2025 – Feb 2026',
    summary:
      'Built OCaml RPC servers that split large backtesting jobs into shards and distribute them across workers, part of a team effort that cut run times from days to hours. Presented the design at internal tech talks.',
  },
  {
    title: 'Tutor',
    org: 'University of Sydney',
    location: 'Sydney',
    period: 'Feb – Jul 2025',
    summary:
      'Ran weekly tutorials for Systems Programming in C and Distributed Systems, covering memory management, concurrency, networking and consensus.',
  },
  {
    title: 'Freelance Web Developer',
    org: 'SoleAgents',
    orgHref: 'https://soleagents.co.nz/',
    location: 'Remote',
    period: 'Jan 2025 – now',
    summary:
      'Built and maintain a real estate website with property search, mailing lists and enquiry forms.',
  },
  {
    title: 'Software Developer',
    org: 'University of Sydney',
    location: 'Sydney',
    period: 'Mar – Dec 2024',
    summary:
      'Built chemistry lab simulations in Unity with biochemistry staff for online classes, modelling how pH, volume and concentration change as liquids are transferred.',
  },
]

export const projects: Project[] = [
  {
    name: 'ITCH Feed Handler',
    summary:
      'A parser and limit order book for Nasdaq TotalView-ITCH 5.0 market data, built to learn modern C++. Tested under sanitizers, with profiling and a lock-free pipeline to come.',
    tech: 'C++20',
    year: '2026',
    status: 'In progress',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/cpp-itch' }],
  },
  {
    name: 'Byte Blasters',
    summary:
      'A roguelike shooter I built solo over ten weeks: 16k lines of C# with modular weapons, node-graph enemy AI and a GPU fog of war.',
    tech: 'C#, Unity',
    year: '2023',
    links: [
      { label: 'Code', href: 'https://github.com/nagahole/byte-blasters' },
      { label: 'Play', href: 'https://nagahole.itch.io/byte-blasters-alpha-testing' },
    ],
  },
  {
    name: 'Generic Minimaxer',
    summary:
      'A game-agnostic minimax engine with alpha-beta pruning, iterative deepening and hard time limits. Describe a game’s rules and it plays.',
    tech: 'Python',
    year: '2025',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/generic_minimaxer' }],
  },
  {
    name: 'PocketWise',
    summary:
      'A budgeting app with Google and Apple sign-in and real-time sync. It was on the App Store from February 2023 to February 2024.',
    tech: 'React Native, Firebase',
    year: '2023',
    links: [{ label: 'Code', href: 'https://github.com/nagahole/pocketwise' }],
  },
  {
    name: 'Scope',
    summary: 'A free FPS aim trainer with 17 scenarios and sensitivity presets for 20 games.',
    tech: 'C#, Unity',
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
  results: 'WAM 86.6 (High Distinction) · ATAR 99.95',
  awards:
    "GS Caird Scholarship in Computer Science, Academic Merit Prize, Dean's List, Chancellor's Award, Dalyell Scholar",
  activities: 'Mentoring subcommittee, Sydney Competitive Programming Club',
}

