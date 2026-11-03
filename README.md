# nagahole.github.io

My personal portfolio site, with projects, experience and my resume.

**Live at [nagahole.github.io](https://nagahole.github.io)**

![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## Stack

- **React 19 and TypeScript,** bundled with Vite
- **Plain CSS** with no UI framework
- **GitHub Actions** builds the site and deploys it to GitHub Pages on every push to `main`

## Structure

```
src/
├── data.ts          # All site content: profile, experience, projects, journey, stats
├── activity.ts      # Generated: each project's commit activity, for its card's line
├── mapData.ts       # Generated: the dot-matrix land mask for the journey map
├── components/      # One component per section (Hero, Journey, Projects, ...)
├── App.tsx
└── index.css
scripts/
└── update-activity.py
public/
├── resume.pdf
└── og.png           # Link preview image
```

Content lives in `src/data.ts`, so updating the site rarely means touching a component.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
```

Each project card's line is that repo's real commit activity. To refresh it (needs the GitHub CLI, signed in):

```bash
python3 scripts/update-activity.py
```
